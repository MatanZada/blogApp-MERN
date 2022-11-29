const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");

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
  // check if user exist
  const userExist = await User.findOne({ email: req?.body?.email });
  if (!userExist) {
    throw new Error(`User already exists`);
  }
  res.json("user login success");
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
};
