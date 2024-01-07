import supabase from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("period").select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase.from("period").insert(body);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("period")
    .delete()
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("period")
    .update(body)
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
