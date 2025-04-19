/**
 * Instatus API Client
 * 
 * This module provides functions to interact with the Instatus API
 * it uses subfiles for different API actions categories
 */

// API configuration
const INSTATUS_SITE_endpoint = process.env.INSTATUS_SITE_endpoint || ""
const INSTATUS_API_KEY = process.env.INSTATUS_API_KEY || ""
const INSTATUS_PAGE_ID = process.env.INSTATUS_SITE_ID || "clv6gn6q424009ben4vg65vfnv"
const INSTATUS_API_endpoint = "https://api.instatus.com/v1"
const CACHE_TTL = 60 // 30 seconds cache
const CACHE = new Map<string, { data: any; timestamp: number }>() // Cache storage with TTL

/**
 * Make a request to the Instatus API with caching
 * @param endpoint 
 * @param data 
 * @returns 
 */

export async function InstatusRequest (endpoint:string="", data:object={}){
    const cacheKey = JSON.stringify(data)
    const now = Date.now()
    
    // Check cache first
    if (CACHE.has(cacheKey) && now - CACHE.get(cacheKey)!.timestamp < CACHE_TTL * 1000) {
        console.log(`Cache hit for ${cacheKey}`)
        return CACHE.get(cacheKey)!.data
    }
    
    // Validate API key
    if (!INSTATUS_API_KEY) {
        console.error("INSTATUS_API_KEY is not set")
        throw new Error("API key not configured")
    }
    
    try {
        const response = await fetch(`${INSTATUS_API_endpoint}/${INSTATUS_PAGE_ID}/${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${INSTATUS_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
    
        if (!response.ok) {
        throw new Error(`Error fetching data from Instatus API: ${response.statusText}`)
        }
    
        const result = await response.json()
        CACHE.set(cacheKey, { data: result, timestamp: now })
        return result
    } catch (error) {
        console.error("Error in InstatusRequest:", error)
        throw error
    }
}

/**
 * Make a request to the Instatus API without caching
 * @param endpoint Endpoint of the request
 * @param data 
 * @returns 
 */
export async function InstatusRequestNoCache (endpoint:string="", data:object={}){
    const cacheKey = JSON.stringify(data)
    
    // Validate API key
    if (!INSTATUS_API_KEY) {
        console.error("INSTATUS_API_KEY is not set")
        throw new Error("API key not configured")
    }
    
    try {
        const response = await fetch(`${INSTATUS_API_endpoint}/${INSTATUS_PAGE_ID}/${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${INSTATUS_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
    
        if (!response.ok) {
        throw new Error(`Error fetching data from Instatus API: ${response.statusText}`)
        }
    
        const result = await response.json()
        return result
        
    } catch (error) {
        console.error("Error in InstatusRequest:", error)
        throw error
    }
}

export async function InstatusRequestPost (endpoint:string="", data:object={}){
    const cacheKey = JSON.stringify(data)
    
    // Validate API key
    if (!INSTATUS_API_KEY) {
        console.error("INSTATUS_API_KEY is not set")
        throw new Error("API key not configured")
    }
    
    try {
        const response = await fetch(`${INSTATUS_API_endpoint}/${INSTATUS_PAGE_ID}/${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${INSTATUS_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
    
        if (!response.ok) {
        throw new Error(`Error fetching data from Instatus API: ${response.statusText}`)
        }
    
        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error in InstatusRequest:", error)
        throw error
    }
}