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
  },
  // TLS/SSL settings - we use tls instead of ssl (more modern)
  tls: true,
  tlsInsecure: false, // Crucial for Vercel - do not allow insecure connections
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  // Add connection timeout
  connectTimeoutMS: 10000, // Increase timeout for Vercel environment
  socketTimeoutMS: 30000,
  retryWrites: true,
  maxIdleTimeMS: 120000, // 2 minutes
  minPoolSize: 1,
  maxPoolSize: 10,
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

  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Parse the MongoDB URI to detect if it's Atlas
    const isAtlas = MONGODB_URI.includes('mongodb+srv');
    
    // Create client with appropriate options
    const client = new MongoClient(MONGODB_URI, options);
    
    // Attempt connection
    await client.connect();
    const db = client.db(MONGODB_DB);
    
    // Verify connection with a ping
    await db.command({ ping: 1 });
    
    console.log(`Successfully connected to MongoDB database: ${MONGODB_DB}`);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Let the error propagate to be handled by the caller
    throw error;
  }
}

// Add this function to help with proper connection initialization in Vercel
export async function initMongoDB() {
  if (isBrowser) {
    console.log('MongoDB initialization skipped in browser environment');
    return;
  }
  
  if (!useMongoStorage()) {
    console.log('MongoDB storage not enabled, skipping initialization');
    return;
  }
  
  try {
    console.log('Initializing MongoDB connection...');
    const connection = await connectToDatabase();
    
    // Verify connection with a ping to ensure it's working properly
    const { db } = connection;
    await db.command({ ping: 1 });
    
    console.log('MongoDB connection initialized successfully');
    
    // Optionally run data migration if needed
    await migrateDataIfNeeded();
    
    return connection;
  } catch (error) {
    console.error('Failed to initialize MongoDB:', error);
    throw error;
  }
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

// Safe wrapper for MongoDB operations with fallback
export async function safeMongoDbOperation<T>(operation: (db: any) => Promise<T>, fallback: T): Promise<T> {
  if (!useMongoStorage()) {
    return fallback;
  }
  
  try {
    const { db } = await connectToDatabase();
    return await operation(db);
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return fallback;
  }
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
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Check if collections exist and have data
    try {
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
    } catch (error) {
      console.error('Error checking collection counts:', error);
      throw error;
    }
    
    console.log('Some collections are empty, migrating data from JSON files...');
    
    // Migrate blog data if needed
    try {
      // Read blog data from JSON
      const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
      const blogDataText = await fs.readFile(blogDataPath, 'utf8');
      const blogData = JSON.parse(blogDataText);
      
      // Insert blog posts if needed
      const blogPostsCount = await db.collection(collections.blogPosts).countDocuments();
      if (blogPostsCount === 0 && blogData.posts && blogData.posts.length > 0) {
        console.log(`Migrating ${blogData.posts.length} blog posts to MongoDB...`);
        await db.collection(collections.blogPosts).insertMany(blogData.posts);
      }
      
      // Insert blog categories if needed
      const blogCategoriesCount = await db.collection(collections.blogCategories).countDocuments();
      if (blogCategoriesCount === 0 && blogData.categories && blogData.categories.length > 0) {
        console.log(`Migrating ${blogData.categories.length} blog categories to MongoDB...`);
        await db.collection(collections.blogCategories).insertMany(blogData.categories);
      }
      
      // Insert authors if needed
      const authorsCount = await db.collection(collections.authors).countDocuments();
      if (authorsCount === 0 && blogData.authors && blogData.authors.length > 0) {
        console.log(`Migrating ${blogData.authors.length} authors to MongoDB...`);
        await db.collection(collections.authors).insertMany(blogData.authors);
      }
      
      console.log('Blog data migration completed');
    } catch (error) {
      console.error('Error migrating blog data:', error);
      throw error;
    }
    
    // Migrate KB data if needed
    try {
      // Read KB data from JSON
      const kbDataPath = path.join(process.cwd(), 'data', 'kb-data.json');
      const kbDataText = await fs.readFile(kbDataPath, 'utf8');
      const kbData = JSON.parse(kbDataText);
      
      // Insert KB posts if needed
      const kbPostsCount = await db.collection(collections.kbPosts).countDocuments();
      if (kbPostsCount === 0 && kbData.articles && kbData.articles.length > 0) {
        console.log(`Migrating ${kbData.articles.length} KB articles to MongoDB...`);
        await db.collection(collections.kbPosts).insertMany(kbData.articles);
      }
      
      // Insert KB categories if needed
      const kbCategoriesCount = await db.collection(collections.kbCategories).countDocuments();
      if (kbCategoriesCount === 0 && kbData.categories && kbData.categories.length > 0) {
        console.log(`Migrating ${kbData.categories.length} KB categories to MongoDB...`);
        await db.collection(collections.kbCategories).insertMany(kbData.categories);
      }
      
      console.log('KB data migration completed');
    } catch (error) {
      console.error('Error migrating KB data:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error checking or migrating data:', error);
    throw error;
  }
}

// Add a dummy export for client components to prevent bundling issues
export const clientSideStub = {
  isClient: true,
  message: 'This is a stub for client-side import safety'
};