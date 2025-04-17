import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a production environment, you would make a real API call to bgp.tools
    // For example:
    // const response = await fetch(`https://api.bgp.tools/v1/as/51692/peers`);
    // const data = await response.json();

    // For now, we'll return mock data
    return new NextResponse(
      JSON.stringify({
        success: true,
        asn: "AS51692",
        peeringCount: 127,
        peers: [
          { asn: "AS13335", name: "Cloudflare, Inc.", country: "US", type: "Transit" },
          { asn: "AS174", name: "Cogent Communications", country: "US", type: "Transit" },
          { asn: "AS6939", name: "Hurricane Electric LLC", country: "US", type: "Peer" },
          { asn: "AS3356", name: "Level 3 Parent, LLC", country: "US", type: "Transit" },
          { asn: "AS1299", name: "Arelion Sweden AB", country: "SE", type: "Transit" },
          { asn: "AS2914", name: "NTT America, Inc.", country: "US", type: "Peer" },
          { asn: "AS9002", name: "RETN Limited", country: "GB", type: "Peer" },
          { asn: "AS20764", name: "RASCOM CJSC", country: "RU", type: "Peer" },
          { asn: "AS8359", name: "MTS PJSC", country: "RU", type: "Peer" },
          { asn: "AS3257", name: "GTT Communications Inc.", country: "US", type: "Transit" },
          { asn: "AS6453", name: "TATA COMMUNICATIONS", country: "US", type: "Transit" },
          { asn: "AS8075", name: "Microsoft Corporation", country: "US", type: "Peer" },
          { asn: "AS15169", name: "Google LLC", country: "US", type: "Peer" },
          { asn: "AS16509", name: "Amazon.com, Inc.", country: "US", type: "Peer" },
          { asn: "AS32934", name: "Facebook, Inc.", country: "US", type: "Peer" },
        ],
        ixps: [
          { name: "AMS-IX", location: "Amsterdam, Netherlands", speed: "100 Gbps" },
          { name: "DE-CIX", location: "Frankfurt, Germany", speed: "100 Gbps" },
          { name: "LINX", location: "London, United Kingdom", speed: "100 Gbps" },
          { name: "Equinix IX", location: "Ashburn, VA, USA", speed: "10 Gbps" },
          { name: "SIX", location: "Seattle, WA, USA", speed: "10 Gbps" },
          { name: "JPNAP", location: "Tokyo, Japan", speed: "10 Gbps" },
          { name: "HKIX", location: "Hong Kong", speed: "10 Gbps" },
          { name: "SGIX", location: "Singapore", speed: "10 Gbps" },
        ],
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching peering data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch peering data" }, { status: 500 })
  }
}
