import supabase from "@/utils/db";
import { NextResponse } from "next/server";
import { TApprovedEnrollment } from "../../../types";

export async function GET(_: any, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("enrollment")
    .select("*, users_view(*)")
    .eq("classId", params.id)
    .eq("status", "approved");

  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(data as TApprovedEnrollment[]);
}
