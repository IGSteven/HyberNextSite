/**
 * WHMCS API Client
 *
 * This module provides functions to interact with the WHMCS API
 * it uses subfiles for different API actions categories
 * such as clients, products, invoices, etc.
 */

// API configuration
const WHMCS_DEBUG = process.env.WHMCS_DEBUG === "true" || false;
const WHMCS_API_URL = process.env.WHMCS_API_URL || ""
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER || ""
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET || ""

export async function apicall(params: any) {
    try {
    // Check if API credentials are available
    if (!WHMCS_API_URL || !WHMCS_API_IDENTIFIER || !WHMCS_API_SECRET) {
        console.warn("WHMCS API credentials not configured.")
        throw new Error("WHMCS API credentials not configured")
    }

    // Construct the API URL
    const apiurl = WHMCS_API_URL.endsWith("/includes/api.php")
        ? WHMCS_API_URL
        : `${WHMCS_API_URL.endsWith("/") ? WHMCS_API_URL.slice(0, -1) : WHMCS_API_URL}/includes/api.php`

    // Add API credentials to the parameters
    params.identifier = WHMCS_API_IDENTIFIER
    params.secret = WHMCS_API_SECRET
    params.responsetype = "json"

    // Log the API request without sensitive information
    const { identifier, secret, ...safeParams } = params;
    console.log("WHMCS Request:", safeParams);

    // Make the API request
    const response = await fetch(apiurl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(params).toString(),
    })

    if (!response.ok) {
        console.error("Error in WHMCS API response:", response.statusText);
    }

    // debugging 
    if (WHMCS_DEBUG) {
        console.log("----------------------")
        console.log(`WHMCS DEBUG - ${params.action}`);
        console.log("Request:", params);
        console.log("Response:", await response.text());
        console.log("----------------------")
    }

    // Parse the response
    const data = await response.json()
    if (data.result !== "success") {
        console.error("Error in WHMCS API response:", data.message);
        throw new Error(`WHMCS API error: ${data.message}`)
    }

    return data;
    }
    catch (error) {
        console.error("Error in WHMCS API call:", error);
        throw error;
    }
}

/**
 * Verify WHMCS API authentication
 * @returns {Promise<boolean>} - Returns true if authentication is successful, false otherwise
 */
export async function verifyAPIAuth() {
    const params = {
        action: "WhmcsDetails"
    }
    const response = await apicall(params);

    if (response.result !== "success") {
        console.error("Error in WHMCS API authentication:", response.message);
        return false;
    }

    return true;
}

// Export all functions from subfiles
export * from "./users" // User API Actions