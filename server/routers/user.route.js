const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { body } = require("express-validator");
const ValidateData = require("../middlewares/validatedata.middleware");

router.post(
  "/register",
  [
    body("name")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters")
      .isLength({ max: 30 })
      .withMessage("Name must be at least 30 characters"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  ValidateData.ValidateData,
  UserController.RegisterUser
);

router.post(
  "/verify",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("otp").isString().notEmpty().withMessage("OTP is required"),
  ],
  ValidateData.ValidateData,
  UserController.VerifyUser
);

module.exports = router;
