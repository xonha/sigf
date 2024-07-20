import supabase from "@/utils/db";
import { Database } from "@/database.types";
import { NextResponse } from "next/server";

export type TPeriod = Database["public"]["Tables"]["period"]["Insert"];

const table = "period";

export async function GET() {
  const { data, error } = await supabase.from(table).select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data as TPeriod[]);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase.from(table).insert(body);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from(table).delete().eq("id", body.id);

  if (error) {
    if (error.code === "23503")
      return NextResponse.json(error.message, { status: 409 });

    return NextResponse.json(error.message, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from(table)
    .update(body)
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
