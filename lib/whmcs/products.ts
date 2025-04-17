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
    module: string;
    paytype: string;
    allowqty: number;
    quantity_available: number;
    pricing: Record<string, CurrencyPricing>;
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

    return request.products.product as Product[];
}