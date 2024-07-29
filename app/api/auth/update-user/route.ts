import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { email, password, full_name, avatar_url } = await request.json();

  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
    data: { full_name, avatar_url },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("data", data);

  return NextResponse.json(data);
}
