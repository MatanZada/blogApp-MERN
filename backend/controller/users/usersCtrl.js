const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");

const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");
const { validateMongodbId } = require("../../utils/validateMongodbID");
const crypto = require("crypto");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const blockUser = require("../../utils/blockUser");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//register
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // check if user exist
  const userExist = await User.findOne({ email: req?.body?.email });
  if (userExist) throw new Error("User already exists");
  //register user
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//login
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  const userExist = await User.findOne({ email });
  //Check if password is match
  if (userExist && (await userExist.isPasswordMatched(password))) {
    res.json({
      _id: userExist?._id,
      firstName: userExist?.firstName,
      lastName: userExist?.lastName,
      email: userExist?.email,
      profilePhoto: userExist?.profilePhoto,
      isAdmin: userExist?.isAdmin,
      token: generateToken(userExist?._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//user
const fetchUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//delete user
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
    // return res.json(deletedUser);
  } catch (err) {
    return res.json(err);
    // return res.json(err);
  }
});

//user details
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
    // return res.json(user);
  } catch (err) {
    return res.json(err);
    // return res.json(err);
  }
});

//user profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id).populate("posts");
    res.json(myProfile);
    // return res.json(myProfile);
  } catch (err) {
    return res.json(err);
    // return res.json(err);
  }
});

//update profile

const updateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  //check if user id is valid
  validateMongodbId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
  // return res.json(myProfile);
});

//update password
const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

//following

const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  //1.Find the user you want to follow and update it's followers field
  //2. Update the login user following field
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You have already followed this user");

  //1. Find the user you want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("You have successfully followed this user");
});

//unfollow
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have successfully unfollowed this user");
});

//block user
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

//unBlock user
const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

// Account Verification - Send email

const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId);

  try {
    //Generate token
    const verificationToken = await user?.createAccountVerificationToken();
    // console.log(verificationToken);
    //save the user
    await user.save();
    // console.log(verificationToken);
    //build your message
    const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:8080/verify-account/${verificationToken}">Click to verify your account</a>`;

    const msg = {
      to: user?.email,
      from: "matan.zada1@gmail.com",
      subject: "Verify your account",
      html: resetURL,
    };
    await sgMail.send(msg);
    res.json(resetURL);
  } catch (error) {
    res.json(error);
  }
});

//Account Verification

const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);

  //find this user by verificationToken

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error("Token expired, try again later");
  //update the proprt to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(userFound);
});

//forget token generator

const forgetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  // res.send("OK");
  //find the user by email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  // res.send("forget password success");
  try {
    const token = await user.createPasswordResetToken();
    // console.log(token);
    await user.save();

    //build your message
    const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:8080/reset-password/${token}">Click to Reset</a>`;
    const msg = {
      to: email,
      from: "matan.zada1@gmail.com",
      subject: "Reset Password",
      html: resetURL,
    };

    const emailMsg = await sgMail.send(msg);
    res.json({
      msg: `A verfication massage is successfully sent to ${user?.email}. Rest now within 10 minutes, ${resetURL} `,
    });
  } catch (error) {
    res.json(error);
  }
});

//password reset

const passwordResetCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, try again later");

  //Update/change the password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//Profile photo upload

const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  //Find the login user
  const { _id } = req.user;
  //block user
  blockUser(req?.user);
  //1. Get the oath to img
  const localPath = `public/images/profile/${req.file.filename}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imgUploaded?.url,
    },
    { new: true }
  );
  //remove the saved img
  fs.unlinkSync(localPath);
  res.json(imgUploaded);
});

module.exports = {
  profilePhotoUploadCtrl,
  userRegisterCtrl,
  loginUserCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordCtrl,
  passwordResetCtrl,
};
