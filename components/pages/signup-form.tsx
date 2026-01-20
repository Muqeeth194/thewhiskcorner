"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Loader2, User, UserPlus } from "lucide-react"
import { toast } from "sonner"
import HeadingText from "../heading-text"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 1. STATE FOR SIGNUP
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // 🆕 NEW: Validation Logic
  const isFormValid =
    (signupData.name || "").trim() !== "" &&
    (signupData.email || "").trim() !== "" &&
    (signupData.password || "").trim() !== "" &&
    (signupData.confirmPassword || "").trim() !== ""

  // 2. HANDLE SIGNUP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Basic Validation
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match!")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post("/api/register", signupData)

      if (!response) throw new Error("Failed to create user")

      toast.success("Please check the mailbox to verify your account")
      router.push("/login")
    } catch (error) {
      console.error("Signup failed", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-0">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-pink-100 bg-white p-8 shadow-xl md:p-9">
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <HeadingText h3="Create an Account" subtext="" />
          <h1 className="font-sans font-light text-muted-foreground text-pink-600 lg:text-sm">
            Enter your details below to join The Whisk Corner
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-600">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                required
                type="text"
                id="name"
                placeholder="John Doe"
                className="border-pink-100 bg-pink-50/30 pl-10"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
              />
            </div>
          </div>

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
                placeholder="you@example.com"
                className="border-pink-100 bg-pink-50/30 pl-10"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
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
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2 pb-2">
            <Label htmlFor="confirmPassword" className="text-slate-600">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                required
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="border-pink-100 bg-pink-50/30 pl-10"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="mt-6 h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg transition-all hover:bg-pink-800 hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Sign Up
              </>
            )}
          </Button>

          {/* Login Link */}
          <div className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-pink-600 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
