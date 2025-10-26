const express = require("express");
const ConnectToDB = require("./config/database");
ConnectToDB();

const app = express();
const UserRouter = require("./routers/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UserRouter);

module.exports = app;
