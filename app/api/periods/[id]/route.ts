import supabase from "@/utils/db";
import { NextResponse } from "next/server";
import { TPeriod } from "../route";

const table = "period";

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data[0] as TPeriod);
}
