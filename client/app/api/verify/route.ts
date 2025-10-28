import AxiosInstance from "@/config/Axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    const response = await AxiosInstance.post("/users/verify", {
      email,
      otp,
    });

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
