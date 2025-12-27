"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Loader2, LogIn } from "lucide-react" // Updated icons
import { toast } from "sonner"
import HeadingText from "../heading-text"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 1. STATE FOR LOGIN
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // 2. HANDLE LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Replace this with your actual NextAuth / Backend logic
      // Example: const result = await signIn("credentials", { ...loginData })

      console.log("Logging in with:", loginData)

      // SIMULATING A LOGIN DELAY FOR DEMO
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // MOCK SUCCESS
      if (loginData.email && loginData.password) {
        toast.success("Welcome back, Admin!")
        router.push("/admin/dashboard") // Redirect to admin panel
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed", error)
      toast.error("Invalid email or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-pink-100 bg-white p-8 shadow-xl md:p-10">
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <HeadingText h3="Login to your account" subtext="" />
          <h1 className="font-sans font-light text-muted-foreground text-pink-600 lg:text-sm">
            Please enter your email below to login to your account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                required
                type="email"
                id="email"
                placeholder="admin@thewhiskcorner.com"
                className="border-pink-100 bg-pink-50/30 pl-10" // pl-10 makes room for the icon
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-600">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                required
                type="password"
                id="password"
                placeholder="••••••••"
                className="border-pink-100 bg-pink-50/30 pl-10"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-6 h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
