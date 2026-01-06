"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutUser() {
  try {
    // 1. Destroy the cookie
    cookies().delete("session_token")

    // 2. Redirect the user back to Login or Home
    // (This automatically acts like router.refresh() too!)
    redirect("/login")
  } catch (error) {
    console.error("Logout Error:", error)
  }
}
