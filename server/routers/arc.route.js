const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ValidateMiddleware = require("../middlewares/validatedata.middleware");
const ArcController = require("../controllers/arc.controller");

module.exports = router;
