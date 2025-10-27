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
