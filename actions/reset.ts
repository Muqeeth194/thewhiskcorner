"use server"

import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { hash } from "bcryptjs"
import { sendEmail } from "@/lib/maileroo" // ✅ Import sendEmail

export async function resetPassword(token: string, password: string) {
  try {
    // 1. Find user with this forgotPasswordToken
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.forgotPasswordToken, token))

    const user = userResult[0]

    if (!user) {
      return { success: false, message: "Invalid or expired token" }
    }

    // 2. Check expiry
    if (!user.forgotPasswordTokenExpiry) {
      return { success: false, message: "Invalid token data" }
    }

    const tokenExpiry = new Date(user.forgotPasswordTokenExpiry)
    const now = new Date()

    // Check if current time is AFTER expiry
    if (now > tokenExpiry) {
      return {
        success: false,
        message: "Token has expired. Please request a new password reset link.",
      }
    }

    // 3. Hash the new password
    const hashedPassword = await hash(password, 10)

    // 4. Update User: Set new password, Clear reset tokens
    await db
      .update(users)
      .set({
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      })
      .where(eq(users.id, user.id))

    // 5. Send Password Reset Completion Email
    // We wrap this in a try-catch so the function returns "Success" even if the email fails (since the password WAS changed).
    try {
      await sendEmail({
        to: user.email,
        name: user.name,
        subject: "Password Changed Successfully",
        emailType: "RESET_SUCCESS",
        userId: user.id,
      })
      console.log(`Reset success email sent to ${user.email}`)
    } catch (emailError) {
      console.error("Failed to send reset confirmation email:", emailError)
    }

    // 6. Return success
    return {
      success: true,
      message: "Password updated successfully",
    }
  } catch (error) {
    console.error("Reset Password Server Action Error:", error)
    return {
      success: false,
      message: "An error occurred while resetting password",
    }
  }
}
