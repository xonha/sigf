import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.status === 400)
      return NextResponse.json({
        ...error,
        message: "Credenciais incorretas.",
      });
    return NextResponse.json({
      ...error,
      message: "Erro ao autenticar usuário.",
    });
  }

  const url = `${requestUrl.origin}/classes`;
  return NextResponse.json({ ...data, status: 200, url });
}
