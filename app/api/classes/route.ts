import { NextRequest, NextResponse } from "next/server";
import supabase from "../../utils/db";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const { data, error } = await supabase
    .from("classes")
    .insert([{ name }])
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function GET() {
  const { data, error } = await supabase.from("classes").select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
