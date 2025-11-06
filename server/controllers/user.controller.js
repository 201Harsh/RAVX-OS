const UserModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");
const UserServices = require("../services/user.service");

module.exports.RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const AllowedEmails = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "live.com",
      "icloud.com",
      "mail.com",
    ];

    if (!AllowedEmails.includes(email.split("@")[1])) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const ifuser = await UserModel.findOne({ email });

    if (ifuser) {
      return res.status(400).json({
        message: "User already exists Just Login Instead!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (iftempUser) {
      return res.status(202).json({
        message: "user Exist Already! Just Verify Your Email!",
        data: iftempUser,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

    const tempuser = await UserServices.CreateTempUser({
      name,
      email,
      password,
      otp,
      otpExpiry,
    });

    res.status(201).json({
      message:
        "User Created Successfully! Check Your Email For OTP Verification",
      data: tempuser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.ResendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (!iftempUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date().getTime() + 5 * 60 * 1000;

    const ResendOtp = await UserServices.ResendOTP({
      email,
      otp,
      otpExpiry,
    });

    res.status(200).json({
      message: "OTP Resent Successfully! Check Your Email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.VerifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (typeof email !== "string" || typeof otp !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ifUser = await UserModel.findOne({ email });

    if (ifUser) {
      return res.status(400).json({
        message: "User already exists Just Login Instead!",
      });
    }

    const iftempUser = await TempUserModel.findOne({ email });

    if (!iftempUser) {
      return res.status(404).json({
        message: "Timeout! Try Again!",
      });
    }

    const user = await UserServices.verifyotp({
      email,
      otp,
    });

    const token = await user.JWT_GEN();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Verified Successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(406).json({
        message: "Invalid request parameters passed Only Strings Allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.status(404).json({
        message: "Invalid Email or Password!",
      });
    }

    const MatchedPassword = await User.comparePassword(password);

    if (!MatchedPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password!",
      });
    }

    const token = await User.JWT_GEN();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Welcome Back! Login Successful",
      data: User,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.Logoutuser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
