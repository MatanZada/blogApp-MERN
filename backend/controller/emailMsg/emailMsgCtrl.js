const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../model/EmailMassaging/EmailMassaging");

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { to, subject, message } = req.body;
  try {
    //buld up msg
    const msg = {
      to,
      subject,
      text: message,
      from: "matan.zada1@outlook.co.il",
    };
    //send massage
    await sgMail.send(msg);
    //save your db
    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      subject,
      message,
    });
    res.json("mail send ");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };
