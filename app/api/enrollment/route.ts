import { NextRequest, NextResponse } from "next/server";
import supabase from "../db";

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const { data, error } = await supabase
    .from("classes")
    .insert([{ name: name }])
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
