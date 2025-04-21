// Blog utility functions for both client and server components
import type { BlogPost, Category, Author } from "./blog-types"
import path from "path"
// Remove the direct import to avoid bundling MongoDB in client-side code
// Instead, we'll dynamically import when needed

// Use imported blog data directly
import blogData from "@/data/blog-data.json"

// Helper for safe MongoDB operations
async function safeMongoOperation<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (typeof window !== 'undefined') {
    return fallback; // We're on the client side, use fallback
  }
  
  // Server-side operation
  try {
    // Dynamically import MongoDB utilities only on the server side
    const { connectToDatabase, collections, useMongoStorage } = await import('./mongodb');
    
    if (!useMongoStorage()) {
      return fallback;
    }
    
    return await operation();
  } catch (error) {
    console.error("MongoDB operation failed:", error);
    return fallback;
  }
}

// Function to read blog data (works in both client and server)
export async function getBlogData() {
  return await safeMongoOperation(async () => {
    // Dynamically import only on server
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    
    // Fetch data from MongoDB
    const posts = await db.collection(collections.blogPosts).find({}).toArray();
    const categories = await db.collection(collections.blogCategories).find({}).toArray();
    const authors = await db.collection(collections.authors).find({}).toArray();
    
    return {
      posts: posts || [],
      categories: categories || [],
      authors: authors || [],
    };
  }, {
    // Default to JSON file storage as fallback
    posts: blogData.posts || [],
    categories: blogData.categories || [],
    authors: blogData.authors || [],
  });
}

// Function to write blog data to storage
export async function writeBlogData(data: any) {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    
    // Clear existing data and insert new data
    // For posts
    if (data.posts && Array.isArray(data.posts)) {
      await db.collection(collections.blogPosts).deleteMany({});
      if (data.posts.length > 0) {
        await db.collection(collections.blogPosts).insertMany(data.posts);
      }
    }
    
    // For categories
    if (data.categories && Array.isArray(data.categories)) {
      await db.collection(collections.blogCategories).deleteMany({});
      if (data.categories.length > 0) {
        await db.collection(collections.blogCategories).insertMany(data.categories);
      }
    }
    
    // For authors
    if (data.authors && Array.isArray(data.authors)) {
      await db.collection(collections.authors).deleteMany({});
      if (data.authors.length > 0) {
        await db.collection(collections.authors).insertMany(data.authors);
      }
    }
    
    return true;
  }, false);
}

// Function to get all blog posts
export async function getPosts(): Promise<BlogPost[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const posts = await db.collection(collections.blogPosts).find({}).toArray();
    return posts || [];
  }, (await getBlogData()).posts || []);
}

// The rest of the functions use getPosts, getCategories, etc. so they will
// automatically work with either storage method

// Function to get a blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const post = await db.collection(collections.blogPosts).findOne({ slug });
    return post || null;
  }, (await getPosts()).find((post) => post.slug === slug) || null);
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const categories = await db.collection(collections.blogCategories).find({}).toArray();
    return categories || [];
  }, (await getBlogData()).categories || []);
}

// Function to get a category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const category = await db.collection(collections.blogCategories).findOne({ id });
    return category || null;
  }, (await getCategories()).find((category) => category.id === id) || null);
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const category = await db.collection(collections.blogCategories).findOne({ slug });
    return category || null;
  }, (await getCategories()).find((category) => category.slug === slug) || null);
}

// Function to get all authors
export async function getAuthors(): Promise<Author[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const authors = await db.collection(collections.authors).find({}).toArray();
    return authors || [];
  }, (await getBlogData()).authors || []);
}

// Function to get an author by ID
export async function getAuthorById(id: string): Promise<Author | null> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const author = await db.collection(collections.authors).findOne({ id });
    return author || null;
  }, (await getAuthors()).find((author) => author.id === id) || null);
}

// Function to get an author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const author = await db.collection(collections.authors).findOne({ slug });
    return author || null;
  }, (await getAuthors()).find((author) => author.slug === slug) || null);
}

// Function to get the default author
export async function getDefaultAuthor(): Promise<Author> {
  const authors = await getAuthors();
  return (
    authors[0] || {
      id: "default",
      name: "HyberHost Team",
      slug: "hyberhost-team",
      bio: "The official HyberHost team account.",
      avatar: "/double-h-monogram.png",
    }
  );
}

// Function to get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const posts = await db.collection(collections.blogPosts)
      .find({ featured: true, status: "published" })
      .toArray();
    return posts || [];
  }, (await getPosts()).filter((post) => post.featured && post.status === "published"));
}

// Function to get published posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const posts = await db.collection(collections.blogPosts)
      .find({ status: "published" })
      .toArray();
    return posts || [];
  }, (await getPosts()).filter((post) => post.status === "published"));
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const posts = await db.collection(collections.blogPosts)
      .find({ 
        $and: [
          { status: "published" },
          { $or: [
            { categoryId: categoryId },
            { categories: categoryId }
          ]}
        ]
      })
      .toArray();
    return posts || [];
  }, (await getPublishedPosts()).filter(
    (post) => post.categoryId === categoryId || (post.categories && post.categories.includes(categoryId)),
  ));
}

// Function to get posts by author
export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  return await safeMongoOperation(async () => {
    const { connectToDatabase, collections } = await import('./mongodb');
    const { db } = await connectToDatabase();
    const posts = await db.collection(collections.blogPosts)
      .find({ authorId: authorId, status: "published" })
      .toArray();
    return posts || [];
  }, (await getPublishedPosts()).filter((post) => post.authorId === authorId));
}
