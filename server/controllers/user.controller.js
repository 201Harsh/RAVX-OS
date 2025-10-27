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
        data: iftempUser
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
