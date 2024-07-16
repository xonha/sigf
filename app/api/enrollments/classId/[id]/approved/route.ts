import supabase from "@/utils/db";
import { Database } from "@/database.types";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export type TApprovedEnrollment =
  Database["public"]["Tables"]["enrollment"]["Insert"] & {
    user_view: Database["public"]["Views"]["users_view"]["Insert"];
  };

export async function GET(_: any, { params }: { params: IParams }) {
  const { data, error } = await supabase
    .from("enrollment")
    .select("*, users_view(*)")
    .eq("classId", params.id)
    .eq("status", "approved");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data as TApprovedEnrollment[]);
}
