/**
 * Currency utility functions
 */

// Define interface for domain to currency mappings
export interface DomainCurrencyMapping {
  [domain: string]: string;
}

// Map domain TLDs to their respective currencies
export const DOMAIN_CURRENCY_MAP: DomainCurrencyMapping = {
  'hyber.uk': 'GBP',
  'hyber.co.uk': 'GBP',
  'hyber.ca': 'CAD',
  'hyber.eu': 'EUR',
  'hyber.de': 'EUR',
  'hyber.fr': 'EUR',
  'hyber.es': 'EUR',
  'hyber.it': 'EUR',
  // Add more mappings as needed
};

// Default currency if no mapping exists
export const DEFAULT_CURRENCY = 'USD';

// Currency symbols for display
export const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'GBP': '£',
  'EUR': '€',
  'CAD': '$',
  'AUD': '$',
};

/**
 * Gets the appropriate currency for the current hostname
 * @param hostname The current hostname
 * @param defaultCurrency Optional fallback currency
 * @returns The appropriate currency code (USD, GBP, EUR, etc.)
 */
export function getCurrencyFromHostname(hostname: string, defaultCurrency = DEFAULT_CURRENCY): string {
  // First try exact match
  if (DOMAIN_CURRENCY_MAP[hostname]) {
    return DOMAIN_CURRENCY_MAP[hostname];
  }
  
  // Then try to match domain without subdomain (e.g., "hyber.uk" from "www.hyber.uk")
  const domainWithoutSubdomain = hostname.split('.').slice(-2).join('.');
  if (DOMAIN_CURRENCY_MAP[domainWithoutSubdomain]) {
    return DOMAIN_CURRENCY_MAP[domainWithoutSubdomain];
  }
  
  // Finally, check for TLD match (e.g., ".uk" for GBP)
  if (hostname.endsWith('.uk')) return 'GBP';
  if (hostname.endsWith('.ca')) return 'CAD';
  if (hostname.endsWith('.eu') || hostname.endsWith('.de') || 
      hostname.endsWith('.fr') || hostname.endsWith('.es') || 
      hostname.endsWith('.it')) return 'EUR';
  
  // Default to provided default currency or USD
  return defaultCurrency;
}

/**
 * Gets the symbol for a given currency code
 * @param currencyCode The currency code (USD, GBP, EUR, etc.)
 * @returns The currency symbol ($, £, €, etc.)
 */
export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode] || '$';
}

/**
 * Server-side function to get currency from a Next.js request
 * Works for both middleware and server components
 * 
 * @param req The Next.js request
 * @returns The currency code based on URL param or domain
 */
export function getCurrencyFromRequest(req: Request): string {
  // Get the URL and create a URL object for easy param access
  const url = new URL(req.url);
  
  // First check for currency parameter in URL
  const currencyParam = url.searchParams.get('currency');
  if (currencyParam && Object.keys(CURRENCY_SYMBOLS).includes(currencyParam)) {
    return currencyParam;
  }
  
  // If no param, use hostname to determine default currency
  const hostname = url.hostname;
  return getCurrencyFromHostname(hostname);
}