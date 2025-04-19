import { getMaintenanceById } from "../../../../lib/status/maintenances";

export async function GET(
  request: Request,
  { params }: { params: { maintenance_id: string } }
) {
  const { maintenance_id } = params;

  try {
    const maintenance = await getMaintenanceById(maintenance_id);

    if (!maintenance) {
      return new Response("Maintenance not found", { status: 404 });
    }

    return new Response(JSON.stringify(maintenance), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching maintenance:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}