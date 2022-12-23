const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/post/postsRoute");

const app = express();
//DB
dbConnect();

//middleware
app.use(express.json());

//Users Route
app.use("/api/users", userRoutes);
//Post route
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.json({ msg: "API for blog Application..." });
});

//err handler
app.use(notFound);
app.use(errorHandler);

//server

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server is running ${PORT}`));
