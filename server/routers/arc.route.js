const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ValidateMiddleware = require("../middlewares/validatedata.middleware");
const ArcController = require("../controllers/arc.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  [body("name").isString().notEmpty().withMessage("Name is required")],
  AuthMiddleware.authUser,
  ValidateMiddleware.ValidateData,
  ArcController.CreateArcLab
);

router.get("/get", AuthMiddleware.authUser, ArcController.GetArcLab);

router.post("/del/:id", AuthMiddleware.authUser, ArcController.DeleteArcLab);

module.exports = router;
