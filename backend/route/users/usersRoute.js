const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUserCtrl,
} = require("../../controller/users/usersCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchUserCtrl);

module.exports = userRoutes;
