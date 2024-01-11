import supabase from "@/app/utils/db";
import { NextResponse } from "next/server";

const tableName = "classDates";

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from(tableName)
    .select("date, id, classes(name, id)")
    .eq("classId", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
