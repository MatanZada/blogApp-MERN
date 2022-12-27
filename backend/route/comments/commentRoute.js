const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
} = require("../../controller/comments/commentCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);
commentRoutes.get("/", authMiddleware, fetchAllCommentsCtrl);
commentRoutes.get("/:id", authMiddleware, fetchCommentCtrl);
commentRoutes.put("/:id", authMiddleware, updateCommentCtrl);

module.exports = commentRoutes;
