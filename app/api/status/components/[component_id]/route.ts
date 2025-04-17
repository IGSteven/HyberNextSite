import { proxyInstatusRequest } from "../../instatus-utils"

export async function GET(
  request: Request,
  { params }: { params: { component_id: string } }
) {
  const { component_id } = params
  return proxyInstatusRequest(`components/${component_id}`)
}