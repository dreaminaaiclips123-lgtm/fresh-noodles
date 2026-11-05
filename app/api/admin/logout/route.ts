import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/analytics/auth";
import { sameOrigin } from "@/lib/analytics/store";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });
  (await cookies()).delete(ADMIN_COOKIE);
  return new Response(null, { status: 204 });
}
