import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/maileroo"

export async function POST(request: Request) {
  try {
    // Get the data from the payload or the request reqBody
    const reqBody = await request.json()

    // console.log("reqBody", reqBody)

    // Check if the password is not present in the payload
    if (!reqBody.password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      )
    }

    // Check if the user already exists in the database
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, reqBody.email))

    // console.log(userExists.length)

    if (userExists.length != 0) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      )
    }

    // Hash the password
    // 10 is the "salt rounds" (cost factor). Higher is safer but slower. 10 is standard.
    const hashedPassword = await hash(reqBody.password, 10)

    // Perform the Update
    // .insert() gives us back the data we just updated
    const createdUser = await db
      .insert(users)
      .values({
        name: reqBody.name,
        email: reqBody.email,
        password: hashedPassword,
        number: reqBody.number,
        instagram: reqBody.instagram,
      })
      .returning()

    // check if the cake was actually updated
    if (createdUser.length === 0) {
      return NextResponse.json({ error: "User not created" }, { status: 404 })
    }

    // Send the verification email
    const sentEmail = await sendEmail({
      to: reqBody.email,
      name: reqBody.name,
      subject: "Welcome to The Whisk Corner",
      html: `<h1>Welcome!</h1><p>Welcome to The Whisk Corner! We're delighted to have you onboard. To activate your account, please click on the activation link below</p>`,
      emailType: "VERIFY",
      userId: createdUser[0].id,
    })

    console.log("Verify Email is sent", sentEmail)

    if (!sentEmail.success) {
      return NextResponse.json(
        { error: "Failed to send the verification email" },
        { status: 500 }
      )
    }

    // Get the updated user with the updated token
    const updatedUser = await db
      .select()
      .from(users)
      .where(eq(users.id, createdUser[0].id))

    // Security: Remove the password from the response object
    // You don't want to send the hash back to the frontend
    const { password, ...userWithoutPassword } = updatedUser[0]

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
