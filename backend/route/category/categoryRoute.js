const express = require("express");
const {
  createCategoryCtrl,
  fetchCategoriesCtrl,
} = require("../../controller/category/categoryCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategoryCtrl);
categoryRoute.get("/", authMiddleware, fetchCategoriesCtrl);

module.exports = categoryRoute;
