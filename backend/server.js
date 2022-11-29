const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");

const app = express();
//DB
dbConnect();

//middleware
app.use(express.json());

//Users Route
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "API for blog Application..." });
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));
