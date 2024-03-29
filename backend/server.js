const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/posts/postsRoute");
const commentRoute = require("./route/comments/commentRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const categoryRoute = require("./route/category/categoryRoute");

const app = express();
//DB
dbConnect();

//middleware
app.use(express.json());
//cors
app.use(cors());
//Users Route
app.use("/api/users", userRoutes);
//Post route
app.use("/api/posts", postRoute);
//Comment Route
app.use("/api/comments", commentRoute);
//email msg
app.use("/api/email", emailMsgRoute);
//category route
app.use("/api/category", categoryRoute);

app.get("/", (req, res) => {
  res.json({ msg: "API for blog Application..." });
});

//err handler
app.use(notFound);
app.use(errorHandler);

//server

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server is running ${PORT}`));
