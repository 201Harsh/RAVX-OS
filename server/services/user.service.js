const UserModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");

module.exports.CreateTempUser = async ({
  name,
  email,
  password,
  otp,
  otpExpiry,
}) => {
  if (!name || !email || !password || !otp || !otpExpiry) {
    throw new Error("All fields are required for creating a user.");
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const TempUser = TempUserModel.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiry,
  });
  return TempUser;
};

module.exports.verifyotp = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("All fields are required for Verifying a user.");
  }

  if (otp.length !== 6) {
    throw new Error("Enter Complete 6 Digit OTP");
  }

  const TempUser = await TempUserModel.findOne({ email });

  if (!TempUser) {
    throw new Error("User not found.");
  }

  if (TempUser.otp !== otp) {
    throw new Error("Invalid OTP.");
  }
  if (TempUser.otpExpiry < Date.now()) {
    throw new Error("OTP has expired.");
  }

  const User = await UserModel.create({
    name: TempUser.name,
    email: TempUser.email,
    password: TempUser.password,
  });

  await TempUserModel.deleteOne({ email });

  return User;
};
