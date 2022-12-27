const express = require("express");
const { sendEmailMsgCtrl } = require("../../controller/emailMsg/emailMsgCtrl");
const { authMiddleware } = require("../../middlewares/auth/authMiddleware");
const emailMsgRoute = express.Router();

emailMsgRoute.post("/", authMiddleware, sendEmailMsgCtrl);

module.exports = emailMsgRoute;
