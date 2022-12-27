const express = require("express");
const { createCommentCtrl } = require("../../controller/comments/commentCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);

module.exports = commentRoutes;
