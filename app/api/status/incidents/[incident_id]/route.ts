import { getIncidentById } from "../../../../lib/status/incidents";

export async function GET(
  request: Request,
  { params }: { params: { incident_id: string } }
) {
  const { incident_id } = params;

  try {
    const incident = await getIncidentById(incident_id);

    if (!incident) {
      return new Response("Incident not found", { status: 404 });
    }

    return new Response(JSON.stringify(incident), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching incident:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}