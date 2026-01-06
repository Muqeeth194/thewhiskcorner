// components/LogoutButton.tsx
"use client"

import { logoutUser } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hooks"
import { logout } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LogoutButton() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser() // Server action to clear cookies
      dispatch(logout()) // ✅ Clear Redux state
      toast.success("Logged out successfully!")
      router.push("/")
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
