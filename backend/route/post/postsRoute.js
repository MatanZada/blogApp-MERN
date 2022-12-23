const express = require("express");
const { createPostCtrl } = require("../../controller/posts/postCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");

const postRoute = express.Router();

postRoute.post("/", authMiddleware, createPostCtrl);

module.exports = postRoute;
