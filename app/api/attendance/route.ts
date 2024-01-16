import supabase from "@/app/utils/db";
import { Database } from "@/database.types";
import { NextRequest, NextResponse } from "next/server";

export type TAttendance = Database["public"]["Tables"]["attendance"]["Insert"];

const table = "attendance";

export async function POST(request: NextRequest) {
  const body: TAttendance = await request.json();

  const { data, error } = await supabase.from(table).insert(body).select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data as TAttendance[]);
}

export async function DELETE(request: NextRequest) {
  const { classId } = await request.json();

  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq("classId", classId)
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const { id, ...body } = await request.json();

  const { data, error } = await supabase
    .from(table)
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data[0]);
}
