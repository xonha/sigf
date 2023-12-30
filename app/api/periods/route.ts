import { NextResponse } from "next/server";
import supabase from "../../utils/db";

export async function GET() {
  const { data, error } = await supabase.from("period").select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
