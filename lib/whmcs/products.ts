/**
 * WHMCS API - Products Module
 * @module lib/whmcs/products
 * 
 * This module provides functions to interact with the WHMCS API for user management.
 */

const { apicall } = require("./index.ts");

// Types
export interface Product {
    pid: number;
    gid: number;
    type: string;
    name: string;
    slug: string;
    "product-url": string;
    description: string;
    features: string[]; // Changed from Map<string, string> to string[]
    module: string;
    paytype: string;
    allowqty: number;
    quantity_available: number;
    pricing: Record<string, CurrencyPricing>;
    minPricing?: Record<string, CurrencyPricing>; // Use CurrencyPricing for consistency
    customfields: CustomFields;
    configoptions: ConfigOptions;
}

export interface CurrencyPricing {
    prefix: string;
    suffix: string;
    msetupfee: string;
    qsetupfee: string;
    ssetupfee: string;
    asetupfee: string;
    bsetupfee: string;
    tsetupfee: string;
    monthly: string;
    quarterly: string;
    semiannually: string;
    annually: string;
    biennially: string;
    triennially: string;
}

// New interface for minimum pricing calculation
export interface MinPricing {
    prefix: string;
    suffix: string;
    monthly: string;
    quarterly: string;
    semiannually: string;
    annually: string;
    biennially: string;
    triennially: string;
}

export interface CustomFields {
    customfield: CustomField[];
}

export interface CustomField {
    id: number;
    name: string;
    description: string;
    required: string;
}

export interface ConfigOptions {
    configoption: ConfigOption[];
}

export interface ConfigOption {
    id: number;
    name: string;
    type: string;
    minqty: number;
    maxqty: number;
    options: OptionList;
}

export interface OptionList {
    option: Option[];
  }
  
export interface Option {
    id: number;
    name: string;
    rawName: string | null;
    recurring: number;
    required: string | null;
    pricing: Record<string, CurrencyPricing>;
}

const productgroup = [
    {
        gid: 19,
        name: "Virtual Servers (VPS)",
        methods: "ALL",
    },
    {
        gid: 14,
        name: "Dedicated Servers",
        methods: "STIPE, CARD, BANK", // Don't Allow PayPal
    },
    {
        gid: 17,
        name: "Other Products",
        methods: "ALL",
    },
    {
        gid: 11,
        name: "Shared Web Hosting",
        methods: "ALL",
    },
    {
        gid: 12,
        name: "Licensed Software",
        methods: "ALL",
    }
]


/**
 * Get Products
 * Action: "GetProducts"
 * @param {object} filters Filters to apply to the product list, including required and optional parameters
 * @returns {Promise<Product[]>} A list of products
 * @throws {Error} If the API call fails
 */
export async function getProducts(filters: Record<string, any> = {}) {
    const params = {
        action: "GetProducts",
        ...filters,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }

    const products = request.products.product as Product[];

    for (const product of products) {
        // Extract features from product description and convert to array format
        const featureList: string[] = [];
        const descriptionLines: string[] = [];
        const lines = product.description.split(/\r?\n/);
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            // Skip empty lines
            if (trimmedLine) {
                // Check if line has a colon (typical for key-value pairs)
                if (trimmedLine.includes(":")) {
                    featureList.push(trimmedLine);
                } else {
                    // Keep non-feature lines in the description
                    descriptionLines.push(trimmedLine);
                }
            }
        }
        
        // Update product with filtered features and cleaned description
        product.features = featureList;
        product.description = descriptionLines.join("\n");
        
        // Calculate minimum pricing including required options
        product.minPricing = calculateMinimumPricing(product);
    }
    
    return products;
}

/**
 * Calculate the minimum pricing for a product by adding the base price and the minimum prices of any required options
 * @param {Product} product The product to calculate minimum pricing for
 * @returns {Record<string, CurrencyPricing>} The minimum pricing for each currency
 */
function calculateMinimumPricing(product: Product): Record<string, CurrencyPricing> {
    const minPricing: Record<string, CurrencyPricing> = {};
    
    // Initialize minPricing with base product pricing - create deep copies to avoid modifying original
    for (const [currency, pricing] of Object.entries(product.pricing)) {
        minPricing[currency] = {
            ...pricing
        };
    }
    
    // No config options, return base pricing
    if (!product.configoptions?.configoption) {
        return minPricing;
    }
    
    // For debugging
    console.log(`Calculating min pricing for ${product.name}`);
    
    // Check for required options and add their minimum prices
    for (const configOption of product.configoptions.configoption) {
        // Skip if not options are available
        if (!configOption.options?.option) {
            continue;
        }
        
        console.log(`Checking config option: ${configOption.name}`);
        
        // Find options that are required
        const requiredOptions = configOption.options.option.filter(option => {
            // Debug log to see the actual required values
            if (process.env.WMCS_DEBUG) {
                console.log(`Option ${option.name}, required value: ${option.required}`);
            }

            // Check for explicit true values
            if (option.required === "1" || option.required === "on" || option.required === true) {
                return true;
            }
            
            // Check if it's a numeric value greater than 0
            if (typeof option.required === 'string') {
                const numValue = Number(option.required);
                if (!isNaN(numValue) && numValue > 0) {
                    return true;
                }
            }
            
            // Special handling for product types
            if (product.name.includes("Legacy") && option.name.includes("OS")) {
                return true;
            }
            
            // Add specific handling for AM4 and AM5 VPS products
            if ((product.name.includes("AM4") || product.name.includes("AM5")) && 
                (option.name.includes("OS") || option.name.toLowerCase().includes("operating system"))) {
                return true;
            }
            
            return false;
        });
        
        console.log(`Found ${requiredOptions.length} required options`);
        
        if (requiredOptions.length === 0) {
            // If no required options found, but this is a config option that should have a selection,
            // let's check if we should include any options by default based on certain rules
            
            // For VPS products, include the cheapest OS option if available
            if (product.gid === 19 && configOption.name.toLowerCase().includes("operating system")) {
                const allOptions = configOption.options.option;
                if (allOptions && allOptions.length > 0) {
                    // Sort options by price (lowest first) and take the first one as a required option
                    const sortedOptions = [...allOptions].sort((a, b) => {
                        const priceA = a.pricing.USD ? parseFloat(a.pricing.USD.monthly) || 0 : 0;
                        const priceB = b.pricing.USD ? parseFloat(b.pricing.USD.monthly) || 0 : 0;
                        return priceA - priceB;
                    });
                    
                    console.log(`Adding cheapest option by default: ${sortedOptions[0].name}`);
                    requiredOptions.push(sortedOptions[0]);
                }
            }
            
            if (requiredOptions.length === 0) {
                continue;
            }
        }
        
        // For each currency, find the minimum price among the required options
        for (const [currency, basePrice] of Object.entries(minPricing)) {
            if (!basePrice) continue;
            
            // Find the minimum price for this option in this currency
            let minOptionPrice = {
                monthly: Number.MAX_VALUE,
                quarterly: Number.MAX_VALUE,
                semiannually: Number.MAX_VALUE,
                annually: Number.MAX_VALUE,
                biennially: Number.MAX_VALUE,
                triennially: Number.MAX_VALUE
            };
            
            for (const option of requiredOptions) {
                const optionPricing = option.pricing[currency];
                if (!optionPricing) continue;
                
                // Update minimum prices if this option has lower prices
                minOptionPrice.monthly = Math.min(minOptionPrice.monthly, parseFloat(optionPricing.monthly) || 0);
                minOptionPrice.quarterly = Math.min(minOptionPrice.quarterly, parseFloat(optionPricing.quarterly) || 0);
                minOptionPrice.semiannually = Math.min(minOptionPrice.semiannually, parseFloat(optionPricing.semiannually) || 0);
                minOptionPrice.annually = Math.min(minOptionPrice.annually, parseFloat(optionPricing.annually) || 0);
                minOptionPrice.biennially = Math.min(minOptionPrice.biennially, parseFloat(optionPricing.biennially) || 0);
                minOptionPrice.triennially = Math.min(minOptionPrice.triennially, parseFloat(optionPricing.triennially) || 0);
            }
            
            // Add the minimum option prices to the base price
            // But only if they're not the initial MAX_VALUE (meaning no valid price was found)
            basePrice.monthly = (parseFloat(basePrice.monthly) + 
                (minOptionPrice.monthly !== Number.MAX_VALUE ? minOptionPrice.monthly : 0)).toString();
            
            basePrice.quarterly = (parseFloat(basePrice.quarterly) + 
                (minOptionPrice.quarterly !== Number.MAX_VALUE ? minOptionPrice.quarterly : 0)).toString();
            
            basePrice.semiannually = (parseFloat(basePrice.semiannually) + 
                (minOptionPrice.semiannually !== Number.MAX_VALUE ? minOptionPrice.semiannually : 0)).toString();
            
            basePrice.annually = (parseFloat(basePrice.annually) + 
                (minOptionPrice.annually !== Number.MAX_VALUE ? minOptionPrice.annually : 0)).toString();
            
            basePrice.biennially = (parseFloat(basePrice.biennially) + 
                (minOptionPrice.biennially !== Number.MAX_VALUE ? minOptionPrice.biennially : 0)).toString();
            
            basePrice.triennially = (parseFloat(basePrice.triennially) + 
                (minOptionPrice.triennially !== Number.MAX_VALUE ? minOptionPrice.triennially : 0)).toString();
        }
    }
    
    // Debug logging of the final minimum pricing
    console.log(`Final minPricing for ${product.name}:`, 
                Object.entries(minPricing).map(([curr, price]) => 
                    `${curr}: ${price.monthly}`).join(', '));
    
    return minPricing;
}

// Cache mechanism for products
interface CacheEntry<T> {
    timestamp: number;
    data: T;
}

// Server-side cache storage (will only persist during server runtime)
const productsCache: Record<string, CacheEntry<Product[]>> = {};

// TTL for cache in milliseconds (1 minute)
const CACHE_TTL = 60 * 1000;

/**
 * Get Products with caching
 * Returns cached data if available and not expired, otherwise fetches fresh data
 * @param {object} filters Filters to apply to the product list
 * @returns {Promise<Product[]>} A list of products
 * @throws {Error} If the API call fails
 */
export async function getProductsCached(filters: Record<string, any> = {}) {
    // Create a cache key based on the filters
    const cacheKey = JSON.stringify(filters);
    
    // Check if we have a valid cache entry
    const cacheEntry = productsCache[cacheKey];
    const now = Date.now();
    
    if (cacheEntry && (now - cacheEntry.timestamp) < CACHE_TTL) {
        console.log(`Using cached products data (age: ${(now - cacheEntry.timestamp) / 1000}s)`);
        return cacheEntry.data;
    }
    
    // Fetch fresh data
    console.log('Cache miss or expired, fetching fresh products data');
    const products = await getProducts(filters);
    
    // Update cache
    productsCache[cacheKey] = {
        timestamp: now,
        data: products
    };
    
    return products;
}