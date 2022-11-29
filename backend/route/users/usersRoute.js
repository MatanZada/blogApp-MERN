const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
} = require("../../controller/users/usersCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);

module.exports = userRoutes;
