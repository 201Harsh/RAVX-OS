import { Registeruser } from "@/controllers/user.controller";

export async function POST(req: Request) {
  return await Registeruser(req);
}
