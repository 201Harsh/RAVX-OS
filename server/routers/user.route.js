const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { body } = require("express-validator");
const ValidateData = require("../middlewares/validatedata.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

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
  "/resend",
  [body("email").trim().isEmail().withMessage("Invalid Email")],
  ValidateData.ValidateData,
  UserController.ResendOTP
);

router.post(
  "/verify",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("otp")
      .isString()
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6 })
      .withMessage("OTP must be at least 6 characters"),
    ,
  ],
  ValidateData.ValidateData,
  UserController.VerifyUser
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid Email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    ,
  ],
  ValidateData.ValidateData,
  UserController.LoginUser
);

router.post(
  "/forgot",
  [body("email").trim().isEmail().withMessage("Invalid Email")],
  ValidateData.ValidateData,
  UserController.ForgotPassword
);

router.post(
  "/reset",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("otp")
      .isString()
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6 })
      .withMessage("OTP must be at least 6 characters"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  ValidateData.ValidateData,
  UserController.UpdateNewPassword
);

router.post("/logout", AuthMiddleware.authUser, UserController.Logoutuser);

router.get('/profile', AuthMiddleware.authUser, UserController.GetUserProfile);

module.exports = router;
