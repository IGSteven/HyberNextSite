import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Function to fetch peering data from bgp.tools
async function fetchPeeringData() {
  try {
    // In a real implementation, you would use the bgp.tools API
    // For now, we'll simulate the data fetch with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // This is sample data - in production, you would fetch this from the API
    return {
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
        { name: "LINX", location: "London, United Kingdom", speed: "100 Gbps" },
        { name: "LONAP", location: "London, United Kingdom", speed: "10 Gbps" },
        { name: "IX Leeds", location: "Leeds, United Kingdom", speed: "10 Gbps" },
        { name: "LINX Manchester", location: "Manchester, United Kingdom", speed: "10 Gbps" },
        { name: "TorIX", location: "Toronto, Canada", speed: "10 Gbps" },
        { name: "QIX", location: "Quebec, Canada", speed: "10 Gbps" },
      ],
    }
  } catch (error) {
    console.error("Error fetching peering data:", error)
    return {
      asn: "AS51692",
      peeringCount: 0,
      peers: [],
      ixps: [],
    }
  }
}

export async function PeeringPartners() {
  const peeringData = await fetchPeeringData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Peering Partners</h3>
          <p className="text-sm text-muted-foreground">Data sourced from bgp.tools for {peeringData.asn}</p>
        </div>
        <Badge className="bg-hyber-orange text-white hover:bg-hyber-red">{peeringData.peeringCount}+ Partners</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {peeringData.peers.map((peer) => (
          <div key={peer.asn} className="flex items-start space-x-3 rounded-md border p-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{peer.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {peer.type}
                </Badge>
              </div>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <span className="font-mono">{peer.asn}</span>
                <span className="mx-2">•</span>
                <span>{peer.country}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a
          href={`https://bgp.tools/as/${peeringData.asn.replace("AS", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-hyber-orange hover:text-hyber-red"
        >
          View complete peering data on bgp.tools →
        </a>
      </div>
    </div>
  )
}

export function PeeringPartnersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60 mt-2" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-3 rounded-md border p-3">
            <div className="flex-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function InternetExchanges() {
  const peeringData = fetchPeeringData()

  return peeringData.then((data) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Internet Exchange Points</h3>
          <p className="text-sm text-muted-foreground">Where you can find {data.asn}</p>
        </div>
        <Badge className="bg-hyber-orange text-white hover:bg-hyber-red">{data.ixps.length} IXPs</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.ixps.map((ixp, index) => (
          <div key={index} className="flex items-start space-x-3 rounded-md border p-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{ixp.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {ixp.speed}
                </Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{ixp.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))
}

export function InternetExchangesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-3 rounded-md border p-3">
            <div className="flex-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
