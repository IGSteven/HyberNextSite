'use server';

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { connectToDatabase, collections, useMongoStorage } from '@/lib/mongodb';
import { KBArticle, KBCategory } from '@/lib/kb-types';

const KB_DATA_FILE_PATH = path.join(process.cwd(), "data", "kb-data.json");

// Read KB data from JSON file
async function readKBDataFromFile() {
  try {
    const data = await fs.readFile(KB_DATA_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading KB data:", error);
    return { articles: [], categories: [] };
  }
}

// Write KB data to JSON file
async function writeKBDataToFile(data: any) {
  try {
    await fs.writeFile(KB_DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing KB data:", error);
    return false;
  }
}

// Read KB data (from MongoDB or JSON file)
async function readKBData() {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const articles = await db.collection(collections.kbPosts).find({}).toArray();
      const categories = await db.collection(collections.kbCategories).find({}).toArray();
      return { articles, categories };
    } catch (error) {
      console.error("Error reading KB data from MongoDB:", error);
      // Fall back to JSON if MongoDB fails
      console.log("Falling back to JSON data storage");
      return readKBDataFromFile();
    }
  } else {
    return readKBDataFromFile();
  }
}

// Write KB data (to MongoDB or JSON file)
async function writeKBData(data: any) {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      
      // Handle articles
      if (data.articles && Array.isArray(data.articles)) {
        await db.collection(collections.kbPosts).deleteMany({});
        if (data.articles.length > 0) {
          await db.collection(collections.kbPosts).insertMany(data.articles);
        }
      }
      
      // Handle categories
      if (data.categories && Array.isArray(data.categories)) {
        await db.collection(collections.kbCategories).deleteMany({});
        if (data.categories.length > 0) {
          await db.collection(collections.kbCategories).insertMany(data.categories);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error writing KB data to MongoDB:", error);
      return false;
    }
  } else {
    return writeKBDataToFile(data);
  }
}

// Create KB article
export async function createKBArticle(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as "draft" | "published";
    const featured = formData.get("featured") === "on";
    const authorId = formData.get("authorId") as string;
    const tagsString = formData.get("tags") as string;
    
    if (!title || !slug) {
      return { success: false, error: "Title and slug are required" };
    }
    
    // Process tags
    const tags = tagsString.split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    // Extract category IDs
    const categoryIds: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""));
      }
    }
    
    const newArticle: KBArticle = {
      id: uuidv4(),
      title,
      slug,
      excerpt: excerpt || "",
      content: content || "",
      status,
      categoryIds,
      authorId: authorId || "",
      tags,
      featured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? new Date().toISOString() : null
    };
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.kbPosts).insertOne(newArticle);
      } catch (error) {
        console.error("Error creating KB article in MongoDB:", error);
        return { success: false, error: "Failed to create article in database" };
      }
    } else {
      const kbData = await readKBData();
      kbData.articles.push(newArticle);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating KB article:", error);
    return { success: false, error: error.message || "Failed to create article" };
  }
}

// Update KB article
export async function updateKBArticle(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as "draft" | "published";
    const featured = formData.get("featured") === "on";
    const authorId = formData.get("authorId") as string;
    const tagsString = formData.get("tags") as string;
    
    if (!id || !title || !slug) {
      return { success: false, error: "ID, title, and slug are required" };
    }
    
    // Process tags
    const tags = tagsString.split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    // Extract category IDs
    const categoryIds: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""));
      }
    }
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // First get the existing article to preserve createdAt
        const existingArticle = await db.collection(collections.kbPosts).findOne({ id });
        if (!existingArticle) {
          return { success: false, error: "Article not found" };
        }
        
        const updatedArticle: KBArticle = {
          id,
          title,
          slug,
          excerpt: excerpt || "",
          content: content || "",
          status,
          categoryIds,
          authorId: authorId || "",
          tags,
          featured,
          createdAt: existingArticle.createdAt,
          updatedAt: new Date().toISOString(),
          publishedAt: status === "published" 
            ? existingArticle.publishedAt || new Date().toISOString() 
            : existingArticle.publishedAt
        };
        
        await db.collection(collections.kbPosts).updateOne(
          { id },
          { $set: updatedArticle }
        );
      } catch (error) {
        console.error("Error updating KB article in MongoDB:", error);
        return { success: false, error: "Failed to update article in database" };
      }
    } else {
      const kbData = await readKBData();
      const articleIndex = kbData.articles.findIndex((article: KBArticle) => article.id === id);
      
      if (articleIndex === -1) {
        return { success: false, error: "Article not found" };
      }
      
      const updatedArticle: KBArticle = {
        id,
        title,
        slug,
        excerpt: excerpt || "",
        content: content || "",
        status,
        categoryIds,
        authorId: authorId || "",
        tags,
        featured,
        createdAt: kbData.articles[articleIndex].createdAt,
        updatedAt: new Date().toISOString(),
        publishedAt: status === "published" 
          ? kbData.articles[articleIndex].publishedAt || new Date().toISOString() 
          : kbData.articles[articleIndex].publishedAt
      };
      
      kbData.articles[articleIndex] = updatedArticle;
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating KB article:", error);
    return { success: false, error: error.message || "Failed to update article" };
  }
}

// Delete KB article
export async function deleteKBArticle(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.kbPosts).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return { success: false, error: "Article not found" };
        }
      } catch (error) {
        console.error("Error deleting KB article from MongoDB:", error);
        return { success: false, error: "Failed to delete article from database" };
      }
    } else {
      const kbData = await readKBData();
      const articleIndex = kbData.articles.findIndex((article: KBArticle) => article.id === id);
      
      if (articleIndex === -1) {
        return { success: false, error: "Article not found" };
      }
      
      kbData.articles.splice(articleIndex, 1);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting KB article:", error);
    return { success: false, error: error.message || "Failed to delete article" };
  }
}

// Create KB category
export async function createKBCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string;
    
    if (!name || !slug) {
      return { success: false, error: "Name and slug are required" };
    }
    
    const kbData = await readKBData();
    
    const categoryExists = kbData.categories.some((cat: any) => cat.slug === slug);
    if (categoryExists) {
      return { success: false, error: "Category with this slug already exists" };
    }
    
    const newCategory: KBCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || "",
      parentId: parentId || undefined
    };
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.kbCategories).insertOne(newCategory);
      } catch (error) {
        console.error("Error creating KB category in MongoDB:", error);
        return { success: false, error: "Failed to create category in database" };
      }
    } else {
      kbData.categories.push(newCategory);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating KB category:", error);
    return { success: false, error: error.message || "Failed to create category" };
  }
}

// Update KB category
export async function updateKBCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string;
    
    if (!id || !name || !slug) {
      return { success: false, error: "ID, name, and slug are required" };
    }
    
    const updatedCategory: KBCategory = {
      id,
      name,
      slug,
      description: description || "",
      parentId: parentId || undefined
    };
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.kbCategories).updateOne(
          { id },
          { $set: updatedCategory }
        );
        
        if (result.matchedCount === 0) {
          return { success: false, error: "Category not found" };
        }
      } catch (error) {
        console.error("Error updating KB category in MongoDB:", error);
        return { success: false, error: "Failed to update category in database" };
      }
    } else {
      const kbData = await readKBData();
      const categoryIndex = kbData.categories.findIndex((cat: KBCategory) => cat.id === id);
      
      if (categoryIndex === -1) {
        return { success: false, error: "Category not found" };
      }
      
      kbData.categories[categoryIndex] = updatedCategory;
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating KB category:", error);
    return { success: false, error: error.message || "Failed to update category" };
  }
}

// Delete KB category
export async function deleteKBCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // First check if this category has subcategories
        const subcategories = await db.collection(collections.kbCategories).find({ parentId: id }).toArray();
        if (subcategories.length > 0) {
          return { success: false, error: "Cannot delete category with subcategories" };
        }
        
        // Check if this category has articles
        const articles = await db.collection(collections.kbPosts).find({ categoryIds: id }).toArray();
        if (articles.length > 0) {
          return { success: false, error: "Cannot delete category with articles" };
        }
        
        // Delete the category
        const result = await db.collection(collections.kbCategories).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return { success: false, error: "Category not found" };
        }
      } catch (error) {
        console.error("Error deleting KB category from MongoDB:", error);
        return { success: false, error: "Failed to delete category from database" };
      }
    } else {
      const kbData = await readKBData();
      
      // Check if this category has subcategories
      const hasSubcategories = kbData.categories.some((cat: KBCategory) => cat.parentId === id);
      if (hasSubcategories) {
        return { success: false, error: "Cannot delete category with subcategories" };
      }
      
      // Check if this category has articles
      const hasArticles = kbData.articles.some((article: KBArticle) => 
        article.categoryIds && article.categoryIds.includes(id)
      );
      if (hasArticles) {
        return { success: false, error: "Cannot delete category with articles" };
      }
      
      const categoryIndex = kbData.categories.findIndex((cat: KBCategory) => cat.id === id);
      
      if (categoryIndex === -1) {
        return { success: false, error: "Category not found" };
      }
      
      kbData.categories.splice(categoryIndex, 1);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write KB data" };
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting KB category:", error);
    return { success: false, error: error.message || "Failed to delete category" };
  }
}