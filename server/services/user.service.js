const UserModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");
const bcrypt = require("bcrypt");

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

module.exports.ResendOTP = async ({ email, otp, otpExpiry }) => {
  if (!email || !otp || !otpExpiry) {
    throw new Error("All fields are required for Resending a OTP.");
  }

  const updatedTempUser = await TempUserModel.findOneAndUpdate(
    { email },
    { otp, otpExpiry }
  );

  await updatedTempUser.save();

  if (!updatedTempUser) {
    throw new Error("User not found.");
  }

  return updatedTempUser;
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

module.exports.ForgotPasswordOtpSend = async ({ email, otp, otpExpiry }) => {
  if (!email || !otp || !otpExpiry) {
    throw new Error("All fields are required for Sending a OTP.");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  const TempUser = await TempUserModel.create({
    name: user.name,
    email: user.email,
    password: user.password,
    otp,
    otpExpiry,
  });

  return TempUser;
};

module.exports.UpdateNewPassword = async ({ email, otp, password }) => {
  if (!email || !otp || !password) {
    throw new Error("All fields are required for Updating a Password.");
  }

  const tempUser = await TempUserModel.findOne({ email });

  if (!tempUser) {
    throw new Error("User not found.");
  }

  if (tempUser.otp !== otp) {
    throw new Error("Invalid OTP.");
  }
  if (tempUser.otpExpiry < Date.now()) {
    throw new Error("OTP has expired.");
  }

  const isSamePassword = await bcrypt.compare(password, tempUser.password);

  if (isSamePassword) {
    throw new Error("Password used before cannot be used again");
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const updatedUser = await UserModel.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

  await TempUserModel.deleteOne({ email });

  return updatedUser;
};
