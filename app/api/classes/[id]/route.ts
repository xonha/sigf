import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db";

export async function DELETE(_: NextRequest, { params }: any) {
  const { data, error } = await supabase
    .from("classes")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
