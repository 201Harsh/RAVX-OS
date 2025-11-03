const express = require("express");
const ConnectToDB = require("./config/database");
ConnectToDB();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const UserRouter = require("./routers/user.route");
const ArcRouter = require("./routers/arc.route");
const AIRouter = require("./routers/ai.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/users", UserRouter);
app.use("/arc", ArcRouter);
app.use("/ai", AIRouter);

module.exports = app;
