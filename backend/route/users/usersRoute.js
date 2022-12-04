const express = require("express");
const {
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
} = require("../../controller/users/usersCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUserCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.put("/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/:id", authMiddleware, updateUserProfileCtrl);
userRoutes.put("/password/:id", authMiddleware, updateUserPasswordCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
