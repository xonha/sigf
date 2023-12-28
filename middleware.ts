import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data, error } = await supabase.auth.getSession();

  if (data.session) return res;

  return NextResponse.redirect(`${requestUrl.origin}/login`);
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|login|api/auth/sign-in-google|api/auth|$).*)",
  ],
};
