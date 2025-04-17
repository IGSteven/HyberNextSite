import { NextResponse } from "next/server"

// In Instatus, the page ID is what we previously called site ID
const INSTATUS_PAGE_ID = process.env.INSTATUS_SITE_ID || "clv6gn6q424009ben4vg65vfnv"
const INSTATUS_API_KEY = process.env.INSTATUS_API_KEY
const CACHE_TTL = 30 // 30 seconds cache

// Cache storage with TTL
interface CacheItem {
  data: any
  timestamp: number
}

const cache: Record<string, CacheItem> = {}

/**
 * Proxy a request to the Instatus API with caching
 * Using API documentation from: https://instatus.com/help/api
 */
export async function proxyInstatusRequest(endpoint: string, options?: RequestInit) {
  const cacheKey = `${endpoint}-${JSON.stringify(options || {})}`
  const now = Date.now()

  // Check cache first
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL * 1000) {
    console.log(`Cache hit for ${endpoint}`)
    return NextResponse.json(cache[cacheKey].data)
  }

  // Validate API key
  if (!INSTATUS_API_KEY) {
    console.error("INSTATUS_API_KEY is not set")
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  try {
    // Determine the correct URL based on the endpoint
    let url: string;

    // Fix URL pattern to match Instatus API structure:
    // https://api.instatus.com/v1/{page_id}/{endpoint}
    if (endpoint.startsWith("incidents/") || endpoint.startsWith("components/") || endpoint.startsWith("maintenances/")) {
      // Detail endpoints: /v1/{page_id}/{type}/{id} - these already include specific IDs in the path
      const parts = endpoint.split('/')
      url = `https://api.instatus.com/v1/${INSTATUS_PAGE_ID}/${parts[0]}/${parts[1]}`
    } else if (endpoint === "incidents" || endpoint === "components" || endpoint === "maintenances") {
      // List endpoints: /v1/{page_id}/{type}
      url = `https://api.instatus.com/v1/${INSTATUS_PAGE_ID}/${endpoint}`
    } else {
      // For other endpoints: /v1/pages/{page_id}/{endpoint}
      url = `https://api.instatus.com/v1/pages/${INSTATUS_PAGE_ID}/${endpoint}`
    }
    
    console.log(`Proxying request to: ${url}`);  // Debug log
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${INSTATUS_API_KEY}`,
        "Content-Type": "application/json",
        ...(options?.headers || {})
      }
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`Instatus API error: ${response.status} - ${errorText}`);
      throw new Error(`Instatus API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache the result
    cache[cacheKey] = {
      data,
      timestamp: now
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error proxying request to ${endpoint}:`, error)
    return NextResponse.json(
      { 
        error: "Failed to fetch data from Instatus",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

/**
 * Handle subscriber creation requests
 */
export async function createInstatusSubscriber(data: any) {
  if (!INSTATUS_API_KEY) {
    console.error("INSTATUS_API_KEY is not set")
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  try {
    // Subscribers endpoint
    const url = `https://api.instatus.com/v1/pages/${INSTATUS_PAGE_ID}/subscribers`
    
    console.log(`Creating subscriber: ${url}`);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${INSTATUS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      console.error(`Instatus API error: ${response.status} - ${await response.text().catch(() => '')}`);
      throw new Error(`Instatus API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error creating subscriber:`, error)
    throw error
  }
}

/**
 * Proxy an RSS feed from Instatus
 */
export async function proxyInstatusRss(path: string) {
  const cacheKey = `rss-${path}`
  const now = Date.now()

  // Check cache first
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL * 1000) {
    console.log(`Cache hit for RSS ${path}`)
    return new NextResponse(cache[cacheKey].data, {
      headers: {
        "Content-Type": "application/rss+xml",
        "Cache-Control": `max-age=${CACHE_TTL}`
      }
    })
  }

  try {
    // Public site pages don't need authentication
    const url = `https://hyber.instatus.com/${path}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Instatus RSS feed responded with status: ${response.status}`)
    }

    const text = await response.text()
    
    // Cache the result
    cache[cacheKey] = {
      data: text,
      timestamp: now
    }

    return new NextResponse(text, {
      headers: {
        "Content-Type": "application/rss+xml",
        "Cache-Control": `max-age=${CACHE_TTL}`
      }
    })
  } catch (error) {
    console.error(`Error proxying RSS feed ${path}:`, error)
    return NextResponse.json(
      { 
        error: "Failed to fetch RSS feed from Instatus",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

/**
 * Fetch components from Instatus
 */
export async function fetchInstatusComponents() {
  if (!INSTATUS_API_KEY) {
    console.error("INSTATUS_API_KEY is not set")
    throw new Error("API key not configured")
  }

  try {
    // Components endpoint
    const url = `https://api.instatus.com/v1/${INSTATUS_PAGE_ID}/components`
    
    console.log(`Fetching components: ${url}`)
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${INSTATUS_API_KEY}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      console.error(`Instatus API error: ${response.status} - ${await response.text().catch(() => '')}`)
      throw new Error(`Instatus API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching components:`, error)
    throw error
  }
}