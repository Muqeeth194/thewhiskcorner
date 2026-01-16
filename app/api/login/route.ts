import { NextResponse } from "next/server"
import { db } from "@/db/dbConfig"
import { users } from "@/db/schema/users"
import { compare, hash } from "bcrypt"
import { eq } from "drizzle-orm"
// We use jose instead of jsonwebtoken because jose works better in Next.js Edge Runtimes/Middleware
import { SignJWT } from "jose"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // get the details from the database
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    // Check if the user exists
    const user = userResult[0]
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      )
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 403 }
      )
    }

    // Validate the password
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    // CREATE THE SESSION TOKEN
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new SignJWT({
      userId: user.id,
      userName: user.name,
      isAdmin: user.isAdmin ? true : false,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret)

    // SET THE COOKIES WITH THE TOKEN
    cookies().set("session_token", token, {
      httpOnly: true, // 🔒 JS cannot read this
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24, // 24 hours in seconds
      path: "/", // Available everywhere
    })

    // Remove sensitive data before returning
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    )
  }
}
