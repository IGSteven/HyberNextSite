// Next.js client components safe import for MongoDB
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';

// Environment variables setup
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'site';
const COLLECTION_BLOG_POSTS = process.env.COLLECTION_BLOG_POSTS || 'posts';
const COLLECTION_BLOG_CATEGORIES = process.env.COLLECTION_BLOG_CATEGORIES || 'categories';
const COLLECTION_AUTHORS = process.env.COLLECTION_AUTHORS || 'authors';
const COLLECTION_KB_POSTS = process.env.COLLECTION_KB_POSTS || 'kb-posts';
const COLLECTION_KB_CATEGORIES = process.env.COLLECTION_KB_CATEGORIES || 'kb-categories';

// Cached connection
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

// MongoDB connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

// Check if we're in a browser environment - this is critical for avoiding SSR issues
const isBrowser = typeof window !== 'undefined';

// Only import fs dynamically on the server side
let fs: any;
if (!isBrowser) {
  // Only import on the server side
  fs = require('fs/promises');
}

export async function connectToDatabase() {
  // This function should only be called server-side
  if (isBrowser) {
    throw new Error('This function is only meant to be called on the server side');
  }

  // If no MongoDB URI is provided, throw an error
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // If we already have a connection, use that
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_URI, options);
  await client.connect();
  const db = client.db(MONGODB_DB);

  console.log(`Connected to MongoDB database: ${MONGODB_DB}`);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Collection names export for reuse
export const collections = {
  blogPosts: COLLECTION_BLOG_POSTS,
  blogCategories: COLLECTION_BLOG_CATEGORIES,
  authors: COLLECTION_AUTHORS,
  kbPosts: COLLECTION_KB_POSTS,
  kbCategories: COLLECTION_KB_CATEGORIES,
};

// Utility to check if MongoDB should be used
export function useMongoStorage() {
  return process.env.STORAGE_DRIVE === 'MONGODB';
}

// Utility to migrate data from JSON to MongoDB if needed
export async function migrateDataIfNeeded() {
  // This function should only be called server-side
  if (isBrowser) {
    console.warn('migrateDataIfNeeded is only meant to be called on the server side');
    return;
  }

  if (!useMongoStorage()) return;
  
  try {
    const { db } = await connectToDatabase();
    
    // Check if collections are empty
    const blogPostsCount = await db.collection(collections.blogPosts).countDocuments();
    const blogCategoriesCount = await db.collection(collections.blogCategories).countDocuments();
    const authorsCount = await db.collection(collections.authors).countDocuments();
    const kbPostsCount = await db.collection(collections.kbPosts).countDocuments();
    const kbCategoriesCount = await db.collection(collections.kbCategories).countDocuments();
    
    console.log(`DB Collection Counts - Blog Posts: ${blogPostsCount}, Blog Categories: ${blogCategoriesCount}, Authors: ${authorsCount}, KB Posts: ${kbPostsCount}, KB Categories: ${kbCategoriesCount}`);
    
    // If all collections have data, no need to migrate
    if (blogPostsCount > 0 && blogCategoriesCount > 0 && authorsCount > 0 && kbPostsCount > 0 && kbCategoriesCount > 0) {
      console.log('All collections have data, no migration needed');
      return;
    }
    
    console.log('Some collections are empty, migrating data from JSON files...');
    
    // Migrate blog data if needed
    if (blogPostsCount === 0 || blogCategoriesCount === 0 || authorsCount === 0) {
      try {
        // Read blog data from JSON
        const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
        const blogDataText = await fs.readFile(blogDataPath, 'utf8');
        const blogData = JSON.parse(blogDataText);
        
        // Insert blog posts if needed
        if (blogPostsCount === 0 && blogData.posts && blogData.posts.length > 0) {
          console.log(`Migrating ${blogData.posts.length} blog posts to MongoDB...`);
          await db.collection(collections.blogPosts).insertMany(blogData.posts);
        }
        
        // Insert blog categories if needed
        if (blogCategoriesCount === 0 && blogData.categories && blogData.categories.length > 0) {
          console.log(`Migrating ${blogData.categories.length} blog categories to MongoDB...`);
          await db.collection(collections.blogCategories).insertMany(blogData.categories);
        }
        
        // Insert authors if needed
        if (authorsCount === 0 && blogData.authors && blogData.authors.length > 0) {
          console.log(`Migrating ${blogData.authors.length} authors to MongoDB...`);
          await db.collection(collections.authors).insertMany(blogData.authors);
        }
        
        console.log('Blog data migration completed');
      } catch (error) {
        console.error('Error migrating blog data:', error);
      }
    }
    
    // Migrate KB data if needed
    if (kbPostsCount === 0 || kbCategoriesCount === 0) {
      try {
        // Read KB data from JSON
        const kbDataPath = path.join(process.cwd(), 'data', 'kb-data.json');
        const kbDataText = await fs.readFile(kbDataPath, 'utf8');
        const kbData = JSON.parse(kbDataText);
        
        // Insert KB posts if needed
        if (kbPostsCount === 0 && kbData.articles && kbData.articles.length > 0) {
          console.log(`Migrating ${kbData.articles.length} KB articles to MongoDB...`);
          await db.collection(collections.kbPosts).insertMany(kbData.articles);
        }
        
        // Insert KB categories if needed
        if (kbCategoriesCount === 0 && kbData.categories && kbData.categories.length > 0) {
          console.log(`Migrating ${kbData.categories.length} KB categories to MongoDB...`);
          await db.collection(collections.kbCategories).insertMany(kbData.categories);
        }
        
        console.log('KB data migration completed');
      } catch (error) {
        console.error('Error migrating KB data:', error);
      }
    }
  } catch (error) {
    console.error('Error checking or migrating data:', error);
  }
}

// Add a dummy export for client components to prevent bundling issues
export const clientSideStub = {
  isClient: true,
  message: 'This is a stub for client-side import safety'
};