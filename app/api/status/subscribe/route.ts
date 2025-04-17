import { NextRequest, NextResponse } from "next/server"
import { createInstatusSubscriber } from "../instatus-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, value, notifyAllServices, services } = body

    if (!type || !value) {
      return NextResponse.json(
        { error: "Type and value are required" },
        { status: 400 }
      )
    }

    // Validate based on subscription type
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        )
      }
    } else if (["webhook", "discord", "slack"].includes(type)) {
      try {
        new URL(value); // Check if URL is valid
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: "Invalid subscription type" },
        { status: 400 }
      )
    }

    // Format subscriber data according to Instatus API
    // https://instatus.com/help/api/subscribers
    let subscriberData: any = {
      delivery: type,
    };

    // Add the delivery details based on type
    if (type === "email") {
      subscriberData.email = value;
    } else if (["webhook", "discord", "slack"].includes(type)) {
      subscriberData.endpoint = value;
    }

    // Add component IDs if not subscribing to all services
    if (!notifyAllServices && Array.isArray(services) && services.length > 0) {
      subscriberData.componentIds = services;
    }

    const result = await createInstatusSubscriber(subscriberData)

    return NextResponse.json({
      success: true,
      message: "Subscription successful",
      data: result
    })
  } catch (error) {
    console.error("Error in status subscription:", error)
    return NextResponse.json(
      { 
        error: "Failed to process subscription",
        message: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}