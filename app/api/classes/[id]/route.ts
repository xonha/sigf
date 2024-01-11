import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../utils/db";

export async function DELETE(_: NextRequest, { params }: any) {
  const { data, error } = await supabase
    .from("classes")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: any) {
  const { name } = await request.json();

  const { data, error } = await supabase
    .from("classes")
    .update({ name: name })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from("classes")
    .select("*, period(*)")
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data[0]);
}
