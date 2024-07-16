import supabase from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

const tableName = "attendance";

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*, classDates(*), users_view(*)")
    .eq("classDateId", params.classDateId);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase.from(tableName).insert(body).select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
