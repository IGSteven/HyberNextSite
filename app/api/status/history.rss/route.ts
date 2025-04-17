import { proxyInstatusRss } from "../instatus-utils"

export async function GET() {
  return proxyInstatusRss("history.rss")
}