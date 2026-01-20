// components/LogoutButton.tsx
"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"

export default function LogoutButton() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully!")
    } catch (error) {
      console.error("Logout failed", error)
      toast.error("Failed to logout. Please try again.")
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white"
    >
      Log Out
    </Button>
  )
}
