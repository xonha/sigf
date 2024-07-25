import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${requestUrl.origin}/api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Could not authenticate user`,
      {
        status: 301,
      },
    );
  }

  return NextResponse.json(data);
}
