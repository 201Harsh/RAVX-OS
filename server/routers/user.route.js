const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { body } = require("express-validator");
const ValidateData = require("../middlewares/validatedata.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");
const {
  registerLimit,
  verifyOtpLimit,
  GlobalLimit,
  loginLimit,
  forgotPasswordLimit,
  logoutLimit,
} = require("../middlewares/rate-limit.middleware");

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
  registerLimit,
  ValidateData.ValidateData,
  UserController.RegisterUser
);

router.post(
  "/resend",

  [body("email").trim().isEmail().withMessage("Invalid Email")],
  GlobalLimit,
  ValidateData.ValidateData,
  UserController.ResendOTP
);

router.post(
  "/verify",
  verifyOtpLimit,
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
  loginLimit,
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
  forgotPasswordLimit,
  [body("email").trim().isEmail().withMessage("Invalid Email")],
  ValidateData.ValidateData,
  UserController.ForgotPassword
);

router.post(
  "/reset",
  GlobalLimit,
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

router.post(
  "/logout",
  logoutLimit,
  AuthMiddleware.authUser,
  UserController.Logoutuser
);

router.get(
  "/profile",
  GlobalLimit,
  AuthMiddleware.authUser,
  UserController.GetUserProfile
);

module.exports = router;
