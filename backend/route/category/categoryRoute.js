const express = require("express");
const {
  createCategoryCtrl,
} = require("../../controller/category/categoryCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategoryCtrl);

module.exports = categoryRoute;
