import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/maileroo"

export async function POST(request: Request) {
  try {
    // 1. Get the email from the payload
    const reqBody = await request.json()
    const { email } = reqBody

    // console.log(email)

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // 2. Check if the user exists in the database
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    // console.log("fetched user", userResult)

    // If no user found, return error
    if (userResult.length === 0) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      )
    }

    const user = userResult[0]

    // 3. Send the Reset Email
    // Note: Your sendEmail function (defined in lib/maileroo) handles:
    // a) Generating the token
    // b) Saving the token to the DB (using userId)
    // c) Sending the actual email
    const emailResponse = await sendEmail({
      to: user.email,
      name: user.name, // Assuming you have a name column
      subject: "Reset your Password",
      emailType: "RESET",
      userId: user.id,
    })

    if (!emailResponse.success) {
      return NextResponse.json(
        { message: "Failed to send reset email" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Password reset link sent successfully",
      success: true,
    })
  } catch (error) {
    console.error("Forgot password API error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
