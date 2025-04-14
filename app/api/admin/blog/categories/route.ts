import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const { name, slug, description } = await request.json()

    // Validate input
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Read the current blog data
    const dataFilePath = path.join(process.cwd(), "data", "blog-data.json")
    const fileContent = fs.readFileSync(dataFilePath, "utf8")
    const blogData = JSON.parse(fileContent)

    // Check if category with the same slug already exists
    const categoryExists = blogData.categories.some((cat: any) => cat.slug === slug)
    if (categoryExists) {
      return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
    }

    // Create new category
    const newCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || "",
    }

    // Add to categories
    blogData.categories.push(newCategory)

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(blogData, null, 2))

    return NextResponse.json({ success: true, category: newCategory })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
