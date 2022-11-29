const User = require("../../model/user/User");

const userRegisterCtrl = async (req, res) => {
  // check if user exist
  const userExist = await User.findOne({ email: req?.body?.email });
  if (userExist) throw new Error("user already exists");

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
};

module.exports = {
  userRegisterCtrl,
};
