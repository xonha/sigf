import supabase from "@/app/utils/db";
import { Database } from "@/database.types";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export type TEnrollment = Database["public"]["Tables"]["enrollment"]["Insert"];

export async function GET(_: any, { params }: { params: IParams }) {
  const { data, error } = await supabase
    .from("enrollment")
    .select("")
    .eq("userId", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data as unknown as TEnrollment[]);
}
