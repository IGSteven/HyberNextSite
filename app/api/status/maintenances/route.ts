import { getMaintenances } from "../../../../lib/status/maintenances";

export async function GET() {
  try {
    const maintenances = await getMaintenances();

    return new Response(JSON.stringify(maintenances), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching maintenances:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}