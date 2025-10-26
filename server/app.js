const express = require("express");
const ConnectToDB = require("./config/database");
ConnectToDB();

const app = express();

module.exports = app;
