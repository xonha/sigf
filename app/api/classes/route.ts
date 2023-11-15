import { NextRequest, NextResponse } from "next/server";
import supabase from "../db";

export interface ClassesPostBody {
  name: string;
}

export async function POST(request: NextRequest) {
  const body: ClassesPostBody = await request.json();

  const { data, error } = await supabase
    .from("classes")
    .insert([{ name: body.name }])
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
