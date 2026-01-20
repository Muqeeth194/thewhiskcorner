import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { quoteRequests } from "@/db/schema/quotes" // Adjust path if needed
import { sendEmail } from "@/lib/maileroo" // Adjust path to your maileroo file
import { desc, eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Save to Database
    await db.insert(quoteRequests).values({
      name: body.name,
      contact: body.contact,
      instagram: body.instagram,
      type: body.type,
      flavour: body.flavour,
      servings: body.servings,
      budget: body.budget,
      message: body.message,
      // Convert ID to string just in case it comes in as a number
      selectedCakeId: body.selected_cake_id
        ? String(body.selected_cake_id)
        : null,
      selectedCakeName: body.selected_cake_name,
    })

    // 2. Send Email Notification to Admin (You)
    const emailResult = await sendEmail({
      to: "muqeethahmed44@gmail.com", // 👈 REPLACE with your email
      name: "Admin",
      emailType: "QUOTE",
      quoteData: {
        userName: body.name,
        userContact: body.contact,
        instagram: body.instagram,
        cakeType: body.type,
        flavour: body.flavour,
        servings: body.servings,
        budget: body.budget,
        message: body.message,
        selectedCakeName: body.selected_cake_name,
        selectedCakeId: body.selected_cake_id,
      },
    })

    if (!emailResult.success) {
      console.error("Quote saved to DB, but email failed:", emailResult.error)
      // We still return success because the data is safely stored in the DB
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully!",
    })
  } catch (error) {
    console.error("Error processing quote request:", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Fetch all quotes, ordered by newest first
    const allQuotes = await db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))

    return NextResponse.json(allQuotes)
  } catch (error) {
    console.error("Failed to fetch quotes:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch quotes" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, isAttended } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing quote ID" },
        { status: 400 }
      )
    }

    await db
      .update(quoteRequests)
      .set({ isAttended: isAttended })
      .where(eq(quoteRequests.id, id))

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    })
  } catch (error) {
    console.error("Failed to update status:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing quote ID" },
        { status: 400 }
      )
    }

    await db.delete(quoteRequests).where(eq(quoteRequests.id, Number(id)))

    return NextResponse.json({
      success: true,
      message: "Quote deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete quote:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete quote" },
      { status: 500 }
    )
  }
}

// Optional: Force dynamic rendering so you always get fresh data (no caching)
export const dynamic = "force-dynamic"
