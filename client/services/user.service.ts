import TempUserModel from "@/models/tempuser.model";

interface TempUser {
  name: string;
  email: string;
  password: string;
  otp: string;
  otpExpiry: Date;
}

export const CreateTempUser = async ({
  name,
  email,
  password,
  otp,
  otpExpiry,
}: TempUser) => {
  if (!name || !email || !password || !otp || !otpExpiry) {
    throw new Error("All fields are required");
  }

  const tempUser = TempUserModel.create({
    name,
    email,
    password,
    otp,
    otpExpiry,
  });

  return tempUser;
};

export const VerifyUserOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  if (!email || !otp) {
    throw new Error("All fields are required");
  }

  const tempUser = await TempUserModel.findOne({ email });

  if (!tempUser) {
    throw new Error("User Not Found");
  }

  if (tempUser.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (tempUser.otpExpiry < new Date()) {
    throw new Error("OTP Expired");
  }

  await TempUserModel.deleteOne({ email });
  return tempUser;
};
