import { proxyInstatusRequest } from "../instatus-utils"

export async function GET() {
  return proxyInstatusRequest("incidents")
}