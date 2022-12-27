const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
} = require("../../controller/comments/commentCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);
commentRoutes.get("/", authMiddleware, fetchAllCommentsCtrl);

module.exports = commentRoutes;
