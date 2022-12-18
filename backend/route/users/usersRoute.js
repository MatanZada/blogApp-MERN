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
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordCtrl,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
} = require("../../controller/users/usersCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const {
  profilePhotoUpload,
} = require("../../middlewares/uploads/profilePhotoUpload");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUserCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);
userRoutes.put("/verify-account", accountVerificationCtrl);
userRoutes.put(
  "/profilephoto-upload",
  profilePhotoUpload.single("image"),
  profilePhotoUploadCtrl
);
userRoutes.put("/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);
userRoutes.put("/:id", authMiddleware, updateUserProfileCtrl);
userRoutes.put("/password/:id", authMiddleware, updateUserPasswordCtrl);
userRoutes.post("/forget-password-token", forgetPasswordCtrl);
userRoutes.post("/reset-password", passwordResetCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
