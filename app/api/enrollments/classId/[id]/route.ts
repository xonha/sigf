import { NextResponse } from "next/server";
import supabase from "../../../../utils/db";

interface IParams {
  id: string;
}

export async function GET(_: any, { params }: { params: IParams }) {
  const { data, error } = await supabase
    .from("enrollment")
    .select("*, users_view(*)")
    .eq("classId", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
