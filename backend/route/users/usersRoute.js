const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
} = require("../../controller/users/usersCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchUserCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
