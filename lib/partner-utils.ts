import { Partner, PartnerListResponse } from './partner-types';
import { connectToDatabase } from './mongodb';

// Function to get all partners
export async function getAllPartners(): Promise<PartnerListResponse> {
  const { db } = await connectToDatabase();
  const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
  
  try {
    const partners = await collection.find({}).toArray();
    return {
      partners: partners as Partner[],
      total: partners.length
    };
  } catch (error) {
    console.error('Error fetching partners from MongoDB:', error);
    return { partners: [], total: 0 };
  }
}

// Function to get a single partner by slug
export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
  
  try {
    const partner = await collection.findOne({ slug });
    return partner as Partner | null;
  } catch (error) {
    console.error(`Error fetching partner with slug ${slug} from MongoDB:`, error);
    return null;
  }
}

// Function to get all partner slugs (for SSG)
export async function getAllPartnerSlugs(): Promise<string[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
  
  try {
    const partners = await collection.find({}, { projection: { slug: 1 } }).toArray();
    return partners.map(partner => partner.slug);
  } catch (error) {
    console.error('Error fetching partner slugs from MongoDB:', error);
    return [];
  }
}

// Function to get featured partners
export async function getFeaturedPartners(limit: number = 3): Promise<Partner[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
  
  try {
    const partners = await collection
      .find({ featured: true })
      .limit(limit)
      .toArray();
    return partners as Partner[];
  } catch (error) {
    console.error('Error fetching featured partners from MongoDB:', error);
    return [];
  }
}

// Helper to add affiliate ID to WHMCS URL
export function addAffiliateIdToUrl(url: string, affiliateId: string): string {
  if (!url || !affiliateId) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}aff=${affiliateId}`;
}

// Function to generate the partner data file path (for file-based storage)
export function getPartnersFilePath(): string {
  return process.cwd() + '/data/partners.json';
}

// Function to get all partners from file if using file-based storage
export async function getPartnersFromFile(): Promise<PartnerListResponse> {
  try {
    const fs = require('fs');
    const path = getPartnersFilePath();
    
    if (!fs.existsSync(path)) {
      return { partners: [], total: 0 };
    }
    
    const fileData = fs.readFileSync(path, 'utf8');
    const partners = JSON.parse(fileData);
    
    return {
      partners,
      total: partners.length
    };
  } catch (error) {
    console.error('Error reading partners from file:', error);
    return { partners: [], total: 0 };
  }
}

// Get partners based on storage configuration
export async function getPartners(): Promise<PartnerListResponse> {
  const storageType = process.env.STORAGE_DRIVE;
  
  if (storageType === 'FILE') {
    return getPartnersFromFile();
  }
  
  // Default to MongoDB
  return getAllPartners();
}

// Get a partner by slug based on storage configuration
export async function getPartner(slug: string): Promise<Partner | null> {
  const storageType = process.env.STORAGE_DRIVE;
  
  if (storageType === 'FILE') {
    const { partners } = await getPartnersFromFile();
    return partners.find(partner => partner.slug === slug) || null;
  }
  
  // Default to MongoDB
  return getPartnerBySlug(slug);
}