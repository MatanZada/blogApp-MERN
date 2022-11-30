const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");
const { validateMongodbId } = require("../../utils/validateMongodbID");

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

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
};
