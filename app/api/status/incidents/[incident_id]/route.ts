import { proxyInstatusRequest } from "../../instatus-utils"

export async function GET(
  request: Request,
  { params }: { params: { incident_id: string } }
) {
  const { incident_id } = params
  return proxyInstatusRequest(`incidents/${incident_id}`)
}