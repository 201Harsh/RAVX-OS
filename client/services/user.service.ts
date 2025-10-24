import TempUser from "@/models/tempuser.model";
import User from "@/models/user.model";

interface TempUserModel {
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
}: TempUserModel) => {
  if (!name || !email || !password || !otp || !otpExpiry) {
    throw new Error("All fields are required");
  }

  const tempUser = TempUser.create({
    name,
    email,
    password,
    otp,
    otpExpiry,
  });

  return tempUser;
};
