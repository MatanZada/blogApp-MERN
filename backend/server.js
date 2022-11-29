const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const { userRegisterCtrl } = require("./controller/users/usersCtrl");

const app = express();
//DB
dbConnect();

//middleware
app.use(express.json());

//custom middleware
const logger = (req, res, next) => {
  console.log("am a logger");
  next();
};

app.use(logger);

//register
app.post("/api/users/register", userRegisterCtrl);

// //login
// app.post("/api/users/login");

app.get("/", (req, res) => {
  res.json({ msg: "API for blog Application..." });
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));
