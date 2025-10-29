import AxiosInstance from "@/config/Axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    const response = await AxiosInstance.post("/users/verify", {
      email,
      otp,
    });

    const NextRes = NextResponse.json(response.data, {
      status: response.status,
    });

    const cookies: any = response.headers["set-cookie"];
    if (cookies) {
      NextRes.headers.set("set-cookie", cookies);
    }

    return NextRes;
  } catch (error: any) {
    if (error.response) {
      return Response.json(
        { error: error.response.data.message },
        { status: error.response.status }
      );
    }
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
