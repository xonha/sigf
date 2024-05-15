import supabase from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { TCalendar, TCalendarUpdate } from "./controller";

export async function GET() {
  const { data, error } = await supabase.from("calendar").select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("calendar")
    .insert([{ ...body }])
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("calendar")
    .update({ ...body })
    .eq("id", body.id)
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("calendar")
    .delete()
    .eq("id", body.id)
    .select("*");
  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
