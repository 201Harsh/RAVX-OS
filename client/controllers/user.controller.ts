import ConnectToDB from "@/config/database";
import TempUserModel from "@/models/tempuser.model";
import UserModel from "@/models/user.model";
import { CreateTempUser } from "@/services/user.service";
import { useRouter } from "next/navigation";

export const Registeruser = async (req: Request) => {
  try {
    await ConnectToDB();

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

    const TempUser = await CreateTempUser({
      name,
      email,
      password,
      otp: otp.toString(),
      otpExpiry: otpExpiry,
    });

    return Response.json({
      message: "Verify OTP to Complete Registration",
      TempUser,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
      status: 500,
    });
  }
};
