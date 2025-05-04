import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getPartnersFilePath } from '@/lib/partner-utils';
import fs from 'fs';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    let partner = null;

    if (process.env.STORAGE_DRIVE === 'FILE') {
      // File-based storage
      const filePath = getPartnersFilePath();
      
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const partners = JSON.parse(fileData);
        partner = partners.find(p => p.slug === slug);
      }
    } else {
      // MongoDB storage
      const { db } = await connectToDatabase();
      const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
      partner = await collection.findOne({ slug });
    }

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, partner },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch partner" },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}