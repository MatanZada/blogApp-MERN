const express = require("express");
const { userRegisterCtrl } = require("../../controller/users/usersCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);

module.exports = userRoutes;
