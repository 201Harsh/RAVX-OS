import AxiosInstance from "@/config/Axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const response = await AxiosInstance.post("/users/login", {
      email,
      password,
    });

    const NextRes = NextResponse.json(response.data, {
      status: response.status,
    });

    const cookies: any = response.headers["set-cookie"];
    if (cookies) {
      NextRes.headers.set("set-cookie", cookies);
    }

    return Response.json({
      data: response.data,
      status: response.status,
    });
  } catch (error: any) {
    if (error.response) {
      return Response.json({
        error: error.response.data.message,
        status: error.response.status,
      });
    }
    return Response.json({
      error: error.message,
      status: 500,
    });
  }
}
