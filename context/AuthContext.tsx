"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/actions/logout"
import { User } from "@/types/contents"

// 2. Define the Context Shape
interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: User | null
}) {
  // 3. Initialize state with the Server Data immediately!
  const [user, setUser] = useState<User | null>(initialUser)
  const router = useRouter()

  // 4. Sync if the server prop ever changes (rare, but good practice)
  useEffect(() => {
    setUser(initialUser)
  }, [initialUser])

  const login = (newUser: User) => {
    setUser(newUser)
    router.refresh()
    // CHECK ADMIN STATUS HERE
    if (newUser.isAdmin) {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  // console.log("auth context user details", user)

  const logout = async () => {
    setUser(null) // Optimistic UI update (Instant)

    // Call your Server Action or API to delete cookie
    await logoutUser()

    router.refresh() // Refresh server components (Layouts)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

// 5. Custom Hook for easy access
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
