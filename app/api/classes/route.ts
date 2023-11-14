import { NextRequest, NextResponse } from "next/server";
import supabase from "../db";

export async function POST(request: NextRequest) {
  const { data, error } = await supabase
    .from("classes")
    .insert([{ name: "Turma 1" }])
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
