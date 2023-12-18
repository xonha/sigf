import { NextRequest, NextResponse } from "next/server";
import supabase from "../db";

export async function POST(request: NextRequest) {
  const { userId, classId } = await request.json();

  const { data, error } = await supabase
    .from("enrollment")
    .insert([{ userId, classId }])
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function GET() {
  const { data, error } = await supabase.from("enrollment").select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { userId, classId } = await request.json();

  const { data, error } = await supabase
    .from("enrollment")
    .delete()
    .eq("userId", userId)
    .eq("classId", classId);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
