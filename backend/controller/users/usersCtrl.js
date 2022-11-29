const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");

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

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
};
