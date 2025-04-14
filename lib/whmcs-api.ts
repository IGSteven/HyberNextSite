/**
 * WHMCS API Client
 *
 * This module provides functions to interact with the WHMCS API
 * for product information, user authentication, and account management.
 */

// API configuration
const WHMCS_API_URL = process.env.WHMCS_API_URL || ""
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER || ""
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET || ""

// Types
export interface Product {
  id: number
  name: string
  description: string
  pricing: {
    monthly: number
    quarterly: number
    semiannually: number
    annually: number
  }
  features: string[]
  group: string
  type: "vps" | "dedicated" | "cloud"
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  companyName?: string
  address?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  phoneNumber?: string
}

export interface LoginResponse {
  success: boolean
  userId?: number
  email?: string
  firstName?: string
  lastName?: string
  token?: string
  error?: string
}

export interface RegisterResponse {
  success: boolean
  userId?: number
  error?: string
}

// Sample data to use as fallback when API is unavailable
const sampleProducts = {
  vps: [
    {
      id: 1,
      name: "Starter VPS",
      description: "Perfect for small websites and applications",
      pricing: { monthly: 19.99, quarterly: 53.97, semiannually: 101.95, annually: 199.99 },
      features: ["2 vCPU Cores", "4GB RAM", "50GB SSD Storage", "Unmetered Bandwidth", "Full Root Access"],
      group: "vps",
      type: "vps",
    },
    {
      id: 2,
      name: "Business VPS",
      description: "Ideal for growing businesses",
      pricing: { monthly: 39.99, quarterly: 107.97, semiannually: 203.95, annually: 399.99 },
      features: [
        "4 vCPU Cores",
        "8GB RAM",
        "100GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
      ],
      group: "vps",
      type: "vps",
    },
    {
      id: 3,
      name: "Premium VPS",
      description: "For high-traffic websites and applications",
      pricing: { monthly: 59.99, quarterly: 161.97, semiannually: 305.95, annually: 599.99 },
      features: [
        "6 vCPU Cores",
        "16GB RAM",
        "200GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
        "DDoS Protection",
      ],
      group: "vps",
      type: "vps",
    },
    {
      id: 4,
      name: "Enterprise VPS",
      description: "For resource-intensive applications",
      pricing: { monthly: 99.99, quarterly: 269.97, semiannually: 509.95, annually: 999.99 },
      features: [
        "8 vCPU Cores",
        "32GB RAM",
        "500GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
        "DDoS Protection",
        "Dedicated IP Addresses",
      ],
      group: "vps",
      type: "vps",
    },
  ],
  dedicated: [
    {
      id: 101,
      name: "Basic Dedicated",
      description: "Entry-level dedicated server",
      pricing: { monthly: 99.99, quarterly: 269.97, semiannually: 509.95, annually: 999.99 },
      features: ["4 CPU Cores", "16GB RAM", "500GB SSD Storage", "Unmetered Bandwidth", "Full Hardware Control"],
      group: "dedicated",
      type: "dedicated",
    },
    {
      id: 102,
      name: "Pro Dedicated",
      description: "For resource-intensive applications",
      pricing: { monthly: 149.99, quarterly: 404.97, semiannually: 764.95, annually: 1499.99 },
      features: [
        "8 CPU Cores",
        "32GB RAM",
        "1TB SSD Storage",
        "Unmetered Bandwidth",
        "Full Hardware Control",
        "DDoS Protection",
      ],
      group: "dedicated",
      type: "dedicated",
    },
  ],
  cloud: [
    {
      id: 201,
      name: "Cloud Starter",
      description: "Entry-level cloud hosting",
      pricing: { monthly: 29.99, quarterly: 80.97, semiannually: 152.95, annually: 299.99 },
      features: ["2 vCPU Cores", "4GB RAM", "50GB SSD Storage", "Unmetered Bandwidth", "Auto-scaling"],
      group: "cloud",
      type: "cloud",
    },
    {
      id: 202,
      name: "Cloud Business",
      description: "For growing businesses",
      pricing: { monthly: 49.99, quarterly: 134.97, semiannually: 254.95, annually: 499.99 },
      features: [
        "4 vCPU Cores",
        "8GB RAM",
        "100GB SSD Storage",
        "Unmetered Bandwidth",
        "Auto-scaling",
        "Load Balancing",
      ],
      group: "cloud",
      type: "cloud",
    },
  ],
}

/**
 * Make a request to the WHMCS API
 */
async function makeApiRequest(action: string, params: Record<string, any> = {}) {
  try {
    // Check if API credentials are available
    if (!WHMCS_API_URL || !WHMCS_API_IDENTIFIER || !WHMCS_API_SECRET) {
      console.warn("WHMCS API credentials not configured. Using sample data.")
      throw new Error("WHMCS API credentials not configured")
    }

    // Construct the API URL
    const apiUrl = WHMCS_API_URL.endsWith("/includes/api.php")
      ? WHMCS_API_URL
      : `${WHMCS_API_URL.endsWith("/") ? WHMCS_API_URL.slice(0, -1) : WHMCS_API_URL}/includes/api.php`

    // Prepare the form data
    const formData = new FormData()
    formData.append("identifier", WHMCS_API_IDENTIFIER)
    formData.append("secret", WHMCS_API_SECRET)
    formData.append("action", action)
    formData.append("responsetype", "json")

    // Add additional parameters
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    // Make the API request
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      console.error(`WHMCS API request failed with status ${response.status}`)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Check if the API returned an error
    if (data.result === "error") {
      console.error("WHMCS API returned an error:", data.message)
      throw new Error(data.message || "Unknown API error")
    }

    return data
  } catch (error) {
    console.error("WHMCS API request failed:", error)
    throw error
  }
}

/**
 * Get all products from WHMCS
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await makeApiRequest("GetProducts")

    if (response.result === "success" && response.products && response.products.product) {
      return response.products.product.map((product: any) => ({
        id: Number.parseInt(product.pid),
        name: product.name,
        description: product.description,
        pricing: {
          monthly: Number.parseFloat(product.pricing.USD.monthly),
          quarterly: Number.parseFloat(product.pricing.USD.quarterly),
          semiannually: Number.parseFloat(product.pricing.USD.semiannually),
          annually: Number.parseFloat(product.pricing.USD.annually),
        },
        features: product.features.feature,
        group: product.gid,
        type: determineProductType(product.name, product.gid),
      }))
    }

    // If API call fails or returns no products, use sample data
    console.warn("No products returned from WHMCS API. Using sample data.")
    return [...sampleProducts.vps, ...sampleProducts.dedicated, ...sampleProducts.cloud]
  } catch (error) {
    console.error("Failed to fetch products:", error)
    // Return sample data as fallback
    return [...sampleProducts.vps, ...sampleProducts.dedicated, ...sampleProducts.cloud]
  }
}

/**
 * Get products by type (vps, dedicated, cloud)
 */
export async function getProductsByType(type: "vps" | "dedicated" | "cloud"): Promise<Product[]> {
  try {
    const products = await getProducts()
    const filteredProducts = products.filter((product) => product.type === type)

    // If no products of the requested type are found, use sample data
    if (filteredProducts.length === 0) {
      console.warn(`No ${type} products found. Using sample data.`)
      return sampleProducts[type] || []
    }

    return filteredProducts
  } catch (error) {
    console.error(`Failed to fetch ${type} products:`, error)
    // Return sample data as fallback
    return sampleProducts[type] || []
  }
}

/**
 * Determine product type based on name and group ID
 */
function determineProductType(name: string, groupId: string): "vps" | "dedicated" | "cloud" {
  const nameLower = name.toLowerCase()

  if (nameLower.includes("vps") || nameLower.includes("virtual")) {
    return "vps"
  } else if (nameLower.includes("dedicated") || nameLower.includes("server")) {
    return "dedicated"
  } else {
    return "cloud"
  }
}

/**
 * Authenticate a user with WHMCS
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await makeApiRequest("ValidateLogin", {
      email,
      password,
    })

    if (response.result === "success") {
      return {
        success: true,
        userId: Number.parseInt(response.userid),
        email: response.email,
        firstName: response.firstname,
        lastName: response.lastname,
        token: response.sessionToken,
      }
    } else {
      return {
        success: false,
        error: response.message || "Authentication failed",
      }
    }
  } catch (error) {
    console.error("Login failed:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

/**
 * Register a new user in WHMCS
 */
export async function registerUser(userData: Omit<User, "id">): Promise<RegisterResponse> {
  try {
    const response = await makeApiRequest("AddClient", {
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      companyname: userData.companyName || "",
      address1: userData.address || "",
      city: userData.city || "",
      state: userData.state || "",
      postcode: userData.postcode || "",
      country: userData.country || "US",
      phonenumber: userData.phoneNumber || "",
      password2: Math.random().toString(36).substring(2, 12), // Generate a random password
      clientip: "127.0.0.1",
    })

    if (response.result === "success") {
      return {
        success: true,
        userId: Number.parseInt(response.clientid),
      }
    } else {
      return {
        success: false,
        error: response.message || "Registration failed",
      }
    }
  } catch (error) {
    console.error("Registration failed:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

/**
 * Get user details from WHMCS
 */
export async function getUserDetails(userId: number): Promise<User | null> {
  try {
    const response = await makeApiRequest("GetClientsDetails", {
      clientid: userId,
    })

    if (response.result === "success") {
      return {
        id: Number.parseInt(response.userid),
        email: response.email,
        firstName: response.firstname,
        lastName: response.lastname,
        companyName: response.companyname,
        address: response.address1,
        city: response.city,
        state: response.state,
        postcode: response.postcode,
        country: response.country,
        phoneNumber: response.phonenumber,
      }
    }

    return null
  } catch (error) {
    console.error("Failed to fetch user details:", error)
    return null
  }
}
