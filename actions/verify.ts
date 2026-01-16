"use server"

import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { sendEmail } from "@/lib/maileroo"
import { eq } from "drizzle-orm"
export async function verifyUser(token: string) {
  try {
    console.log("Token:", token)

    // 1. Find user with this token
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.verifyToken, token))
    const user = userResult[0]

    // console.log(user)

    if (!user) {
      return { success: false, message: "Invalid token" }
    }

    // 2. Check expiry (Ensure you parse dates correctly)

    if (!user.verifyTokenExpiry) {
      return { success: false, message: "Token is invalid" }
    }

    const tokenExpiry = new Date(user.verifyTokenExpiry)
    const now = new Date()

    // console.log("Token expiry:", tokenExpiry)
    // console.log("Current time:", now)

    // Check if current time is AFTER expiry (token expired)
    if (now > tokenExpiry) {
      return {
        success: false,
        message: "Token has expired. Please request a new verification email.",
      }
    }

    // 3. Update User: Verified = true, Clear tokens
    const updatedUser = await db
      .update(users)
      .set({
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      })
      .where(eq(users.id, user.id))
      .returning()

    const verifiedUser = updatedUser[0]

    // console.log("Verified User", verifiedUser)

    // Send the welcome email
    if (verifiedUser) {
      try {
        await sendEmail({
          to: user.email,
          name: verifiedUser.name,
          subject: "You're all set! Welcome to The Whisk Corner 🎉",
          html: `Congratulations! Your email has been successfully verified. 
        You are now officially a part of <span class="highlight">The Whisk Corner</span> family.`,
          emailType: "WELCOME",
          userId: verifiedUser.id,
        })
        console.log("Welcome email sent via Server Action")
      } catch (emailError) {
        // Don't fail the verification if email fails, just log it
        console.error("Failed to send welcome email:", emailError)
      }
    }

    // 4. Return success
    return {
      success: true,
      message: "Email verified successfully",
      user: updatedUser[0],
    }
  } catch (error) {
    console.error("Verification Error:", error)
    return { success: false, message: "An error occured during verification" }
  }
}
