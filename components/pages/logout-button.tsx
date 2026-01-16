// components/LogoutButton.tsx
"use client"

import { logoutUser } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hooks"
import { logout } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"

export default function LogoutButton() {
  // const dispatch = useAppDispatch()
  // const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      // await logoutUser() // Server action to clear cookies
      // dispatch(logout()) // ✅ Clear Redux state

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
