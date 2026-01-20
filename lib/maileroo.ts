import { MailerooClient, EmailAddress } from "maileroo-sdk"
import { SendEmailParams } from "@/types/contents"
import { fromString, uuid } from "uuidv4"
import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { getVerificationEmailHtml } from "./email-templates/verify-email"
import { getPasswordResetEmailHtml } from "./email-templates/reset-password"
import { getWelcomeEmailHtml } from "./email-templates/post-verification"
import { getQuoteEmailHtml } from "./email-templates/quote-request"
import { getContactEmailHtml } from "./email-templates/contact-email"
import { getResetSuccessEmailHtml } from "./email-templates/reset-success"

// Initialize the client once
const client = new MailerooClient(process.env.MAILEROO_API_KEY!)

export const sendEmail = async ({
  to,
  name = "User",
  subject,
  html,
  emailType,
  userId,
  quoteData,
  contactData,
}: SendEmailParams) => {
  try {
    // Generate token if the email type is Verify or reset
    const isTransactional = emailType === "VERIFY" || emailType === "RESET"

    let token = ""
    let verifyUrl = ""
    let resetUrl = ""

    if (isTransactional && userId) {
      // Generate the token and save it in the database and also send it in the email.
      token = fromString(name)

      const expiryDate = new Date(Date.now() + 3600000) // 1 hour

      const updatedData =
        emailType === "VERIFY"
          ? {
              verifyToken: token,
              verifyTokenExpiry: expiryDate,
            }
          : emailType === "RESET"
            ? {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: expiryDate,
              }
            : {}

      console.log("email type:", emailType)

      await db.update(users).set(updatedData).where(eq(users.id, userId))

      // console.log(
      //   `User ${emailType === "VERIFY" ? "verify" : "forgot password"} token updated for userId:`,
      //   userId
      // )
      if (emailType === "VERIFY") {
        verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
      } else if (emailType === "RESET") {
        resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/forgot-password?token=${token}`
      }
      // console.log("Reset URL", resetUrl)
    }

    // DETERMINE CONTENT BASED ON TYPE
    let emailSubject = "Notification"
    let emailHtml = "<p>Notification</p>"

    if (emailType === "VERIFY") {
      emailSubject = "Verify your email"
      emailHtml = getVerificationEmailHtml(verifyUrl, name)
    } else if (emailType === "RESET") {
      emailSubject = "Reset your password"
      emailHtml = getPasswordResetEmailHtml(resetUrl, name)
    } else if (emailType === "RESET_SUCCESS") {
      // 👈 2. Add Reset Success Logic
      emailSubject = "Security Alert: Password Updated"
      emailHtml = getResetSuccessEmailHtml(
        name,
        `${process.env.NEXT_PUBLIC_APP_URL}/login`
      )
    } else if (emailType === "WELCOME") {
      emailSubject = "Welcome Onboard"
      emailHtml = getWelcomeEmailHtml(name, "http://localhost:3000/gallery")
    } else if (emailType === "QUOTE") {
      emailSubject = `New Quote Request: ${name}`
      // Check if data exists to prevent crash
      if (quoteData) {
        emailHtml = getQuoteEmailHtml(quoteData)
      } else {
        console.error("Quote Data missing for QUOTE email type")
        return { success: false, error: "Missing quote data" }
      }
    } else if (emailType == "CONTACT") {
      emailSubject = `New Contact Request: ${name}`

      if (contactData) {
        emailHtml = getContactEmailHtml(contactData)
      } else {
        console.error("Contact Data missing for CONTACT email type")
        return { success: false, error: "Missing contact data" }
      }
    }

    const referenceId = await client.sendBasicEmail({
      from: new EmailAddress(
        process.env.MAILEROO_FROM_EMAIL!,
        "The Whisk Corner"
      ),
      to: [new EmailAddress(to, name)],
      subject: emailSubject,
      html: emailHtml,
      plain: emailHtml.replace(/<[^>]*>?/gm, ""),
    })

    // console.log(`Email sent successfully to ${to}. ID: ${referenceId}`)
    return { success: true, id: referenceId }
  } catch (error) {
    console.error("Failed to send email via Maileroo SDK:", error)
    return { success: false, error }
  }
}
