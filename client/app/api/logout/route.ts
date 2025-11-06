import AxiosInstance from "@/config/Axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const response = await AxiosInstance.post(
      "/users/logout",
      {},
      {
        headers: {
          Cookie: cookieHeader, // ✅ forward cookie to backend
        },
        withCredentials: true,
      }
    );

    const res = NextResponse.json(response.data, {
      status: response.status,
    });

    const backendCookie: any = response.headers["set-cookie"];
    if (backendCookie) {
      res.headers.set("set-cookie", backendCookie);
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message },
      { status: error.response?.status }
    );
  }
}
