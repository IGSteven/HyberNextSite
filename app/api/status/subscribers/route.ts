import { NextRequest, NextResponse } from "next/server";
import { Contact, subscribeToStatusPage } from "@/lib/status/subscribers";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Destructure contact data and components from the request
    const { contact = {}, components = [] } = body;
    
    // Validate that at least one contact method is provided
    if (!hasValidContactMethod(contact)) {
      return NextResponse.json(
        { error: "At least one contact method (email, webhook, discord, slack, or microsoftTeamsWebhook) is required" },
        { status: 400 }
      );
    }
    
    // Call the subscription function
    const result = await subscribeToStatusPage(contact, components);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to status updates",
      data: result
    });
  } catch (error) {
    console.error("Error in status subscription:", error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: "Failed to process subscription",
        message: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to validate that at least one contact method is provided
 */
function hasValidContactMethod(contact: Partial<Contact>): boolean {
  return !!(
    contact.email ||
    contact.webhook ||
    contact.discord ||
    contact.slack ||
    contact.microsoftTeamsWebhook
  );
}