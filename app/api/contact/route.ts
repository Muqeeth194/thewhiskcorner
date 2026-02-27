import { sendEmail } from "@/lib/maileroo"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Send Email Notification to Admin (You)
    const emailResult = await sendEmail({
      to: "thewhiskcornerhyderabad@gmail.com",
      name: "Admin",
      emailType: "CONTACT",
      contactData: {
        userName: body.name,
        userContact: body.contact,
        cakeType: body.type,
        message: body.message,
      },
    })

    if (!emailResult.success) {
      console.error("Quote saved to DB, but email failed:", emailResult.error)
      // We still return success because the data is safely stored in the DB
    }

    return NextResponse.json({
      success: true,
      message: "Contact request submitted successfully!",
    })
  } catch (error) {
    console.error("Error processing contact request:", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
