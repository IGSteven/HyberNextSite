import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { connectToDatabase, collections, useMongoStorage } from '@/lib/mongodb';
import { KBCategory } from '@/lib/kb-types';

const KB_DATA_FILE_PATH = path.join(process.cwd(), "data", "kb-data.json");

// Helper functions
async function readKBDataFromFile() {
  try {
    const data = await fs.readFile(KB_DATA_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading KB data:", error);
    return { articles: [], categories: [] };
  }
}

async function writeKBDataToFile(data: any) {
  try {
    await fs.writeFile(KB_DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing KB data:", error);
    return false;
  }
}

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

// POST handler for creating a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, parentId } = body;
    
    if (!name || !slug) {
      return NextResponse.json({ 
        success: false, 
        error: "Name and slug are required" 
      }, { status: 400 });
    }
    
    const kbData = await readKBData();
    
    const categoryExists = kbData.categories.some((cat: any) => cat.slug === slug);
    if (categoryExists) {
      return NextResponse.json({ 
        success: false, 
        error: "Category with this slug already exists" 
      }, { status: 400 });
    }
    
    const newCategory: KBCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || "",
      parentId: parentId && parentId !== "none" ? parentId : undefined
    };
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.kbCategories).insertOne(newCategory);
      } catch (error) {
        console.error("Error creating KB category in MongoDB:", error);
        return NextResponse.json({ 
          success: false, 
          error: "Failed to create category in database" 
        }, { status: 500 });
      }
    } else {
      kbData.categories.push(newCategory);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return NextResponse.json({ 
          success: false, 
          error: "Failed to write KB data" 
        }, { status: 500 });
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    
    return NextResponse.json({ 
      success: true,
      category: newCategory
    });
  } catch (error: any) {
    console.error("Error creating KB category:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to create category" 
    }, { status: 500 });
  }
}

// PUT handler for updating a category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug, description, parentId } = body;
    
    if (!id || !name || !slug) {
      return NextResponse.json({ 
        success: false, 
        error: "ID, name, and slug are required" 
      }, { status: 400 });
    }
    
    const updatedCategory: KBCategory = {
      id,
      name,
      slug,
      description: description || "",
      parentId: parentId && parentId !== "none" ? parentId : undefined
    };
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.kbCategories).updateOne(
          { id },
          { $set: updatedCategory }
        );
        
        if (result.matchedCount === 0) {
          return NextResponse.json({ 
            success: false, 
            error: "Category not found" 
          }, { status: 404 });
        }
      } catch (error) {
        console.error("Error updating KB category in MongoDB:", error);
        return NextResponse.json({ 
          success: false, 
          error: "Failed to update category in database" 
        }, { status: 500 });
      }
    } else {
      const kbData = await readKBData();
      const categoryIndex = kbData.categories.findIndex((cat: KBCategory) => cat.id === id);
      
      if (categoryIndex === -1) {
        return NextResponse.json({ 
          success: false, 
          error: "Category not found" 
        }, { status: 404 });
      }
      
      kbData.categories[categoryIndex] = updatedCategory;
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return NextResponse.json({ 
          success: false, 
          error: "Failed to write KB data" 
        }, { status: 500 });
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    
    return NextResponse.json({ 
      success: true,
      category: updatedCategory
    });
  } catch (error: any) {
    console.error("Error updating KB category:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to update category" 
    }, { status: 500 });
  }
}

// DELETE handler for deleting a category
export async function DELETE(request: NextRequest) {
  try {
    // Get id from the URL search parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "Category ID is required" 
      }, { status: 400 });
    }
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // First check if this category has subcategories
        const subcategories = await db.collection(collections.kbCategories).find({ parentId: id }).toArray();
        if (subcategories.length > 0) {
          return NextResponse.json({ 
            success: false, 
            error: "Cannot delete category with subcategories" 
          }, { status: 400 });
        }
        
        // Check if this category has articles
        const articles = await db.collection(collections.kbPosts).find({ categoryIds: id }).toArray();
        if (articles.length > 0) {
          return NextResponse.json({ 
            success: false, 
            error: "Cannot delete category with articles" 
          }, { status: 400 });
        }
        
        // Delete the category
        const result = await db.collection(collections.kbCategories).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return NextResponse.json({ 
            success: false, 
            error: "Category not found" 
          }, { status: 404 });
        }
      } catch (error) {
        console.error("Error deleting KB category from MongoDB:", error);
        return NextResponse.json({ 
          success: false, 
          error: "Failed to delete category from database" 
        }, { status: 500 });
      }
    } else {
      const kbData = await readKBData();
      
      // Check if this category has subcategories
      const hasSubcategories = kbData.categories.some((cat: KBCategory) => cat.parentId === id);
      if (hasSubcategories) {
        return NextResponse.json({ 
          success: false, 
          error: "Cannot delete category with subcategories" 
        }, { status: 400 });
      }
      
      // Check if this category has articles
      const hasArticles = kbData.articles.some((article: any) => 
        article.categoryIds && article.categoryIds.includes(id)
      );
      if (hasArticles) {
        return NextResponse.json({ 
          success: false, 
          error: "Cannot delete category with articles" 
        }, { status: 400 });
      }
      
      const categoryIndex = kbData.categories.findIndex((cat: KBCategory) => cat.id === id);
      
      if (categoryIndex === -1) {
        return NextResponse.json({ 
          success: false, 
          error: "Category not found" 
        }, { status: 404 });
      }
      
      kbData.categories.splice(categoryIndex, 1);
      
      const writeSuccess = await writeKBData(kbData);
      if (!writeSuccess) {
        return NextResponse.json({ 
          success: false, 
          error: "Failed to write KB data" 
        }, { status: 500 });
      }
    }
    
    revalidatePath("/kb");
    revalidatePath("/admin/kb");
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting KB category:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to delete category" 
    }, { status: 500 });
  }
}