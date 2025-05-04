import { NextResponse } from "next/server";
import { createPartner } from "@/app/actions/partner-actions";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const partnerData = await request.json();
    
    // Create a FormData object to reuse the existing server action
    const formData = new FormData();
    
    // Add all partner data fields to the FormData
    Object.entries(partnerData).forEach(([key, value]) => {
      if (key === 'socialLinks') {
        // Handle nested social links object
        Object.entries(value as Record<string, string>).forEach(([socialKey, socialValue]) => {
          formData.append(socialKey, socialValue as string);
        });
      } else if (key !== 'id') { // Skip the id field as we'll generate a new one
        formData.append(key, value as string);
      }
    });
    
    // Use the existing server action to create the partner
    const result = await createPartner(formData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create partner" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}