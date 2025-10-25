import { VerifyOTP } from "@/controllers/user.controller";

export async function POST(req: Request) {
  return await VerifyOTP(req);
}
