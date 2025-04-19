import { getComponentById } from "@/lib/status/components";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { component_id: string } }
) {
  const { component_id } = await params;

  const component = await getComponentById(component_id);

  if (!component) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  return NextResponse.json(component);
}