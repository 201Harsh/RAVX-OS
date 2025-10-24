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
