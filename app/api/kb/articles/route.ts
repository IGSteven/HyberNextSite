import { NextRequest, NextResponse } from "next/server"
import { getPublishedArticles } from "@/lib/kb-utils"
import { revalidatePath } from "next/cache"
import { connectToDatabase, collections, useMongoStorage } from '@/lib/mongodb'
import fs from "fs/promises"
import path from "path"

const KB_DATA_FILE_PATH = path.join(process.cwd(), "data", "kb-data.json")

// Helper functions
async function readKBDataFromFile() {
  try {
    const data = await fs.readFile(KB_DATA_FILE_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading KB data:", error)
    return { articles: [], categories: [] }
  }
}

async function writeKBDataToFile(data: any) {
  try {
    await fs.writeFile(KB_DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing KB data:", error)
    return false
  }
}

async function readKBData() {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase()
      const articles = await db.collection(collections.kbPosts).find({}).toArray()
      const categories = await db.collection(collections.kbCategories).find({}).toArray()
      return { articles, categories }
    } catch (error) {
      console.error("Error reading KB data from MongoDB:", error)
      // Fall back to JSON if MongoDB fails
      console.log("Falling back to JSON data storage")
      return readKBDataFromFile()
    }
  } else {
    return readKBDataFromFile()
  }
}

async function writeKBData(data: any) {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase()
      
      // Handle articles
      if (data.articles && Array.isArray(data.articles)) {
        await db.collection(collections.kbPosts).deleteMany({})
        if (data.articles.length > 0) {
          await db.collection(collections.kbPosts).insertMany(data.articles)
        }
      }
      
      // Handle categories
      if (data.categories && Array.isArray(data.categories)) {
        await db.collection(collections.kbCategories).deleteMany({})
        if (data.categories.length > 0) {
          await db.collection(collections.kbCategories).insertMany(data.categories)
        }
      }
      
      return true
    } catch (error) {
      console.error("Error writing KB data to MongoDB:", error)
      return false
    }
  } else {
    return writeKBDataToFile(data)
  }
}

export async function GET() {
  try {
    const articles = await getPublishedArticles()

    return new NextResponse(
      JSON.stringify({
        success: true,
        articles,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching KB articles:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KB articles",
      },
      { status: 500 },
    )
  }
}

// Add POST handler for creating KB articles
export async function POST(request: NextRequest) {
  try {
    const article = await request.json()
    
    // Validate required fields
    if (!article.title || !article.slug || !article.excerpt || !article.content) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: title, slug, excerpt, and content are required" 
        }, 
        { status: 400 }
      )
    }
    
    // Check if slug is unique
    const kbData = await readKBData()
    const slugExists = kbData.articles.some((existingArticle: any) => existingArticle.slug === article.slug)
    
    if (slugExists) {
      return NextResponse.json(
        { success: false, error: "An article with this slug already exists" }, 
        { status: 400 }
      )
    }
    
    // Save the article
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase()
        await db.collection(collections.kbPosts).insertOne(article)
      } catch (error) {
        console.error("Error saving KB article to MongoDB:", error)
        return NextResponse.json(
          { success: false, error: "Failed to save article to database" }, 
          { status: 500 }
        )
      }
    } else {
      kbData.articles.push(article)
      const writeSuccess = await writeKBData(kbData)
      
      if (!writeSuccess) {
        return NextResponse.json(
          { success: false, error: "Failed to write KB data" }, 
          { status: 500 }
        )
      }
    }
    
    // Revalidate paths
    revalidatePath("/kb")
    revalidatePath("/admin/kb")
    
    return NextResponse.json({ 
      success: true,
      article
    })
  } catch (error: any) {
    console.error("Error creating KB article:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to create KB article" 
      }, 
      { status: 500 }
    )
  }
}

// Add PUT handler for updating KB articles
export async function PUT(request: NextRequest) {
  try {
    const updatedArticle = await request.json()
    
    // Validate required fields
    if (!updatedArticle.id || !updatedArticle.title || !updatedArticle.slug) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: id, title, and slug are required" 
        }, 
        { status: 400 }
      )
    }
    
    // Check slug uniqueness (except for the current article)
    const kbData = await readKBData()
    const slugExists = kbData.articles.some(
      (existingArticle: any) => 
        existingArticle.slug === updatedArticle.slug && 
        existingArticle.id !== updatedArticle.id
    )
    
    if (slugExists) {
      return NextResponse.json(
        { success: false, error: "Another article with this slug already exists" }, 
        { status: 400 }
      )
    }
    
    // Update the article
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase()
        const result = await db.collection(collections.kbPosts).updateOne(
          { id: updatedArticle.id },
          { $set: updatedArticle }
        )
        
        if (result.matchedCount === 0) {
          return NextResponse.json(
            { success: false, error: "Article not found" }, 
            { status: 404 }
          )
        }
      } catch (error) {
        console.error("Error updating KB article in MongoDB:", error)
        return NextResponse.json(
          { success: false, error: "Failed to update article in database" }, 
          { status: 500 }
        )
      }
    } else {
      const articleIndex = kbData.articles.findIndex(
        (article: any) => article.id === updatedArticle.id
      )
      
      if (articleIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Article not found" }, 
          { status: 404 }
        )
      }
      
      kbData.articles[articleIndex] = updatedArticle
      const writeSuccess = await writeKBData(kbData)
      
      if (!writeSuccess) {
        return NextResponse.json(
          { success: false, error: "Failed to write KB data" }, 
          { status: 500 }
        )
      }
    }
    
    // Revalidate paths
    revalidatePath("/kb")
    revalidatePath("/admin/kb")
    
    return NextResponse.json({ 
      success: true,
      article: updatedArticle
    })
  } catch (error: any) {
    console.error("Error updating KB article:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to update KB article" 
      }, 
      { status: 500 }
    )
  }
}

// Add DELETE handler for deleting KB articles
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Article ID is required" }, 
        { status: 400 }
      )
    }
    
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase()
        const result = await db.collection(collections.kbPosts).deleteOne({ id })
        
        if (result.deletedCount === 0) {
          return NextResponse.json(
            { success: false, error: "Article not found" }, 
            { status: 404 }
          )
        }
      } catch (error) {
        console.error("Error deleting KB article from MongoDB:", error)
        return NextResponse.json(
          { success: false, error: "Failed to delete article from database" }, 
          { status: 500 }
        )
      }
    } else {
      const kbData = await readKBData()
      const articleIndex = kbData.articles.findIndex((article: any) => article.id === id)
      
      if (articleIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Article not found" }, 
          { status: 404 }
        )
      }
      
      kbData.articles.splice(articleIndex, 1)
      const writeSuccess = await writeKBData(kbData)
      
      if (!writeSuccess) {
        return NextResponse.json(
          { success: false, error: "Failed to write KB data" }, 
          { status: 500 }
        )
      }
    }
    
    // Revalidate paths
    revalidatePath("/kb")
    revalidatePath("/admin/kb")
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting KB article:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to delete KB article" 
      }, 
      { status: 500 }
    )
  }
}
