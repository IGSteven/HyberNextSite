import { proxyInstatusRequest } from "../../instatus-utils"

export async function GET(
  request: Request,
  { params }: { params: { maintenance_id: string } }
) {
  const { maintenance_id } = params
  return proxyInstatusRequest(`maintenances/${maintenance_id}`)
}