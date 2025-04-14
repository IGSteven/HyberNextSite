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
  shortDescription?: string
  pricing: {
    monthly: number
    quarterly: number
    semiannually: number
    annually: number
  }
  features: string[]
  group: string
  type: "vps" | "dedicated" | "cloud"
  configOptionId?: number
  configOptions?: ConfigOption[]
}

export interface ConfigOption {
  id: number
  name: string
  options: {
    id: number
    name: string
    pricing: {
      monthly: number
      quarterly: number
      semiannually: number
      annually: number
    }
  }[]
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
      name: "Legacy Intel VPS",
      description: "Base Clock: 3.60 GHz\nCores: 2\nRAM: 4GB\nStorage: 50GB SSD",
      shortDescription: "Reliable Intel-based virtual servers",
      pricing: { monthly: 19.99, quarterly: 53.97, semiannually: 101.95, annually: 199.99 },
      features: ["Base Clock: 3.60 GHz", "Cores: 2", "RAM: 4GB", "Storage: 50GB SSD", "Unmetered Bandwidth"],
      group: "19",
      type: "vps",
      configOptionId: 54,
      configOptions: [
        {
          id: 54,
          name: "Server Configuration",
          options: [
            {
              id: 101,
              name: "2 vCPU, 4GB RAM, 50GB SSD",
              pricing: { monthly: 19.99, quarterly: 53.97, semiannually: 101.95, annually: 199.99 },
            },
            {
              id: 102,
              name: "4 vCPU, 8GB RAM, 100GB SSD",
              pricing: { monthly: 39.99, quarterly: 107.97, semiannually: 203.95, annually: 399.99 },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Ryzen AM4 VPS",
      description: "Base Clock: 4.20 GHz\nCores: 4\nRAM: 8GB\nStorage: 100GB NVMe",
      shortDescription: "High-performance AMD Ryzen servers",
      pricing: { monthly: 39.99, quarterly: 107.97, semiannually: 203.95, annually: 399.99 },
      features: ["Base Clock: 4.20 GHz", "Cores: 4", "RAM: 8GB", "Storage: 100GB NVMe", "Unmetered Bandwidth"],
      group: "19",
      type: "vps",
      configOptionId: 53,
      configOptions: [
        {
          id: 53,
          name: "Server Configuration",
          options: [
            {
              id: 201,
              name: "4 vCPU, 8GB RAM, 100GB NVMe",
              pricing: { monthly: 39.99, quarterly: 107.97, semiannually: 203.95, annually: 399.99 },
            },
            {
              id: 202,
              name: "6 vCPU, 16GB RAM, 200GB NVMe",
              pricing: { monthly: 59.99, quarterly: 161.97, semiannually: 305.95, annually: 599.99 },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Ryzen AM5 VPS",
      description: "Base Clock: 4.50 GHz\nCores: 6\nRAM: 16GB\nStorage: 200GB NVMe",
      shortDescription: "Latest generation AMD Ryzen technology",
      pricing: { monthly: 59.99, quarterly: 161.97, semiannually: 305.95, annually: 599.99 },
      features: ["Base Clock: 4.50 GHz", "Cores: 6", "RAM: 16GB", "Storage: 200GB NVMe", "Unmetered Bandwidth"],
      group: "19",
      type: "vps",
      configOptionId: 55,
      configOptions: [
        {
          id: 55,
          name: "Server Configuration",
          options: [
            {
              id: 301,
              name: "6 vCPU, 16GB RAM, 200GB NVMe",
              pricing: { monthly: 59.99, quarterly: 161.97, semiannually: 305.95, annually: 599.99 },
            },
            {
              id: 302,
              name: "8 vCPU, 32GB RAM, 400GB NVMe",
              pricing: { monthly: 99.99, quarterly: 269.97, semiannually: 509.95, annually: 999.99 },
            },
          ],
        },
      ],
    },
  ],
  dedicated: [
    {
      id: 101,
      name: "Basic Dedicated",
      description: "Entry-level dedicated server",
      shortDescription: "Entry-level dedicated server",
      pricing: { monthly: 99.99, quarterly: 269.97, semiannually: 509.95, annually: 999.99 },
      features: ["4 CPU Cores", "16GB RAM", "500GB SSD Storage", "Unmetered Bandwidth", "Full Hardware Control"],
      group: "dedicated",
      type: "dedicated",
    },
    {
      id: 102,
      name: "Pro Dedicated",
      description: "For resource-intensive applications",
      shortDescription: "For resource-intensive applications",
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
      shortDescription: "Entry-level cloud hosting",
      pricing: { monthly: 29.99, quarterly: 80.97, semiannually: 152.95, annually: 299.99 },
      features: ["2 vCPU Cores", "4GB RAM", "50GB SSD Storage", "Unmetered Bandwidth", "Auto-scaling"],
      group: "cloud",
      type: "cloud",
    },
    {
      id: 202,
      name: "Cloud Business",
      description: "For growing businesses",
      shortDescription: "For growing businesses",
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

// Map product names to their configuration option IDs
const productConfigOptions: Record<string, number> = {
  "Legacy Intel VPS": 54,
  "Ryzen AM4 VPS": 53,
  "Ryzen AM5 VPS": 55,
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
 * Extract features from product description
 * Looks for lines in format "ITEM: VALUE" or "ITEM:VALUE"
 */
function extractFeaturesFromDescription(description: string): string[] {
  if (!description) return []

  const features: string[] = []
  const lines = description.split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine && (trimmedLine.includes(":") || trimmedLine.includes(":"))) {
      features.push(trimmedLine)
    }
  }

  // Add some standard features if none were found
  if (features.length === 0) {
    features.push("Unmetered Bandwidth", "Full Root Access")
  }

  return features
}

/**
 * Get configuration options for a product
 */
export async function getProductConfigOptions(productId: number): Promise<ConfigOption[]> {
  try {
    const response = await makeApiRequest("GetProductConfigOptions", {
      pid: productId,
    })

    if (response.result === "success" && response.configoptions && response.configoptions.configoption) {
      return response.configoptions.configoption.map((configOption: any) => ({
        id: Number.parseInt(configOption.id),
        name: configOption.name,
        options: configOption.options.option.map((option: any) => ({
          id: Number.parseInt(option.id),
          name: option.name,
          pricing: {
            monthly: Number.parseFloat(option.pricing.USD.monthly),
            quarterly: Number.parseFloat(option.pricing.USD.quarterly),
            semiannually: Number.parseFloat(option.pricing.USD.semiannually),
            annually: Number.parseFloat(option.pricing.USD.annually),
          },
        })),
      }))
    }

    // If API call fails or returns no config options, use sample data
    console.warn(`No config options returned for product ${productId}. Using sample data.`)

    // Find the product in sample data
    for (const type in sampleProducts) {
      const product = sampleProducts[type as keyof typeof sampleProducts].find((p) => p.id === productId)
      if (product && product.configOptions) {
        return product.configOptions
      }
    }

    return []
  } catch (error) {
    console.error(`Failed to fetch config options for product ${productId}:`, error)

    // Find the product in sample data
    for (const type in sampleProducts) {
      const product = sampleProducts[type as keyof typeof sampleProducts].find((p) => p.id === productId)
      if (product && product.configOptions) {
        return product.configOptions
      }
    }

    return []
  }
}

/**
 * Get all products from WHMCS
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await makeApiRequest("GetProducts")

    if (response.result === "success" && response.products && response.products.product) {
      const products = await Promise.all(
        response.products.product.map(async (product: any) => {
          // Extract features from product description
          const description = product.description || ""
          const shortDescription = product.shortdescription || ""
          const features = extractFeaturesFromDescription(description)

          // Get config option ID if available
          const configOptionId = productConfigOptions[product.name] || undefined

          // Calculate the minimal pricing
          let pricing = {
            monthly: Number.parseFloat(product.pricing.USD.monthly) || 0,
            quarterly: Number.parseFloat(product.pricing.USD.quarterly) || 0,
            semiannually: Number.parseFloat(product.pricing.USD.semiannually) || 0,
            annually: Number.parseFloat(product.pricing.USD.annually) || 0,
          }

          // If pricing is 0, try to get the minimal config option pricing
          if (pricing.monthly === 0 && configOptionId) {
            try {
              const configOptions = await getProductConfigOptions(Number.parseInt(product.pid))
              if (configOptions.length > 0) {
                const firstOption = configOptions[0]
                if (firstOption.options.length > 0) {
                  const minOption = firstOption.options[0]
                  pricing = minOption.pricing
                }
              }
            } catch (error) {
              console.error(`Failed to fetch config options for product ${product.pid}:`, error)
            }
          }

          return {
            id: Number.parseInt(product.pid),
            name: product.name,
            description: description,
            shortDescription: shortDescription,
            pricing: pricing,
            features: features,
            group: product.gid,
            type: determineProductType(product.name, product.gid),
            configOptionId: configOptionId,
          }
        }),
      )

      return products
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
    let filteredProducts: Product[] = []

    if (type === "vps") {
      // For VPS, filter by group ID 19
      filteredProducts = products.filter((product) => product.group === "19")
    } else {
      // For other types, filter by type
      filteredProducts = products.filter((product) => product.type === type)
    }

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
  // If group ID is 19, it's a VPS product
  if (groupId === "19") {
    return "vps"
  }

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
