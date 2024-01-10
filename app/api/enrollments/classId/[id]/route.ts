import { NextRequest, NextResponse } from "next/server";
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

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("enrollment")
    .update(body)
    .eq("classId", body.classId)
    .eq("userId", body.userId)
    .select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
