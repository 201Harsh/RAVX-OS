const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth.middleware");
const ValidateMiddleware = require("../middlewares/validatedata.middleware");
const ArcController = require("../controllers/arc.controller");
const { body } = require("express-validator");
const {
  createArcLabLimit,
  GlobalLimit,
} = require("../middlewares/rate-limit.middleware");

router.post(
  "/create",
  createArcLabLimit,
  [body("name").isString().notEmpty().withMessage("Name is required")],
  AuthMiddleware.authUser,
  ValidateMiddleware.ValidateData,
  ArcController.CreateArcLab
);

router.get(
  "/get",
  GlobalLimit,
  AuthMiddleware.authUser,
  ArcController.GetArcLab
);

router.get(
  "/get/:id",
  GlobalLimit,
  AuthMiddleware.authUser,
  ArcController.GetArcLabByID
);

router.delete(
  "/del/:id",
  GlobalLimit,
  AuthMiddleware.authUser,
  ArcController.DeleteArcLab
);

module.exports = router;
