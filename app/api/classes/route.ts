import { NextRequest, NextResponse } from "next/server";
import supabase from "../../utils/db";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("classes")
    .insert([body])
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
