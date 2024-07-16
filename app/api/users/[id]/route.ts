import supabase from "@/utils/db";
import { NextResponse } from "next/server";
import { TUser } from "../route";

const table = "user";

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data[0] as TUser);
}
