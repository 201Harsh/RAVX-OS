import ConnectToDB from "@/config/database";
import TempUserModel from "@/models/tempuser.model";
import UserModel from "@/models/user.model";
import { CreateTempUser, VerifyUserOtp } from "@/services/user.service";

ConnectToDB();

export const Registeruser = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({
        error: "All fields are required",
        status: 400,
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return Response.json({
        error: "Name email and password must be a string value only!",
        status: 400,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return Response.json({
        error: "User Already Registered",
        status: 400,
      });
    }

    const tempUser = await TempUserModel.findOne({ email });

    if (tempUser) {
      return Response.json({
        error: "User Already Registered. Now Verify OTP",
        status: 400,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await UserModel.hashPassword(password);

    const TempUser = await CreateTempUser({
      name,
      email,
      password: hashedPassword,
      otp: otp.toString(),
      otpExpiry: otpExpiry,
    });

    return Response.json({
      message: "Verify OTP to Complete Registration",
      TempUser,
      status: 201,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message,
      status: 500,
    });
  }
};

export const VerifyOTP = async (req: Request) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json({
        error: "All fields are required",
        status: 400,
      });
    }

    if (typeof email !== "string" || typeof otp !== "string") {
      return Response.json({
        error: "Email and OTP must be a string value only!",
        status: 400,
      });
    }

    if (otp.length !== 6) {
      return Response.json({
        error: "OTP must be a 6 digit value only!",
        status: 400,
      });
    }

    const tempUser = await TempUserModel.findOne({ email });

    if (!tempUser) {
      return Response.json({
        error: "User Not Found",
        status: 400,
      });
    }

    const User = await VerifyUserOtp({
      email,
      otp,
    });

    return Response.json({
      message: "User Registered Successfully",
      User,
      status: 201,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message,
      status: 500,
    });
  }
};
