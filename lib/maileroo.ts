import { MailerooClient, EmailAddress } from "maileroo-sdk"
import { SendEmailParams } from "@/types/contents"
import { fromString, uuid } from "uuidv4"
import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { getVerificationEmailHtml } from "./email-templates/verify-email"
import { getPasswordResetEmailHtml } from "./email-templates/reset-password"

// Initialize the client once
const client = new MailerooClient(process.env.MAILEROO_API_KEY!)

export const sendEmail = async ({
  to,
  name = "User",
  subject,
  html,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    // Generate the token and save it in the database and also send it in the email.
    const token = fromString(name)

    const updatedData =
      emailType === "VERIFY"
        ? {
            verifyToken: token,
            verifyTokenExpiry: new Date(Date.now() + 360000),
          }
        : emailType === "RESET"
          ? {
              forgotPasswordToken: token,
              forgotPasswordTokenExpiry: new Date(Date.now() + 360000),
            }
          : {}

    await db.update(users).set(updatedData).where(eq(users.id, userId))

    console.log(
      `User ${emailType === "VERIFY" ? "verify" : "forgot password"} token updated for userId:`,
      userId
    )

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    const referenceId = await client.sendBasicEmail({
      from: new EmailAddress(
        process.env.MAILEROO_FROM_EMAIL!,
        "The Whisk Corner"
      ),
      to: [new EmailAddress(to, name)],
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : emailType === "RESET"
            ? "Reset your password"
            : "",
      html:
        emailType === "VERIFY"
          ? getVerificationEmailHtml(verifyUrl, name)
          : emailType === "RESET"
            ? getPasswordResetEmailHtml(verifyUrl, name)
            : "",
      plain: html.replace(/<[^>]*>?/gm, ""), // Basic strip HTML for plain text fallback
    })

    // console.log(`Email sent successfully to ${to}. ID: ${referenceId}`)
    return { success: true, id: referenceId }
  } catch (error) {
    console.error("Failed to send email via Maileroo SDK:", error)
    return { success: false, error }
  }
}
