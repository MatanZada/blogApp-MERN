const express = require("express");
const {
  createPostCtrl,
  fetchPostsCtrl,
} = require("../../controller/posts/postCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  postImageResize,
} = require("../../middlewares/uploads/photoUpload");
const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postImageResize,
  createPostCtrl
);

postRoute.get("/", fetchPostsCtrl);

module.exports = postRoute;
