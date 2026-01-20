"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutUser() {
  try {
    // Destroy the cookie
    cookies().delete("session_token")
  } catch (error) {
    console.error("Logout Error:", error)
  }
}
