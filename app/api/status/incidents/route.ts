import { getIncidents } from "../../../../lib/status/incidents";

export async function GET() {
  try {
    const incidents = await getIncidents();

    return new Response(JSON.stringify(incidents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}