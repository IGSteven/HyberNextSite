import { NextResponse } from "next/server";
import { getComponents } from "@/lib/status/components";

export async function GET() {
  try {
    const components = await getComponents();

    return NextResponse.json({
      success: true,
      data: components,
    });
  } catch (error) {
    console.error("Error fetching status components:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch status components",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}