"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Loader2,
  ArrowLeft,
  Send,
  Lock,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import HeadingText from "@/components/heading-text"
import Link from "next/link"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPassword } from "@/actions/reset"

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset Password State
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isResetSuccess, setIsResetSuccess] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  // Validations
  const isEmailValid = email.trim() !== ""
  const isPasswordValid =
    newPassword.length >= 0 && newPassword === confirmPassword

  // 1. Handle "Send Reset Link" (Forgot Password)
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post("/api/forgotpassword", { email })
      if (response.status === 200) {
        setIsSubmitted(true)
        toast.success("Reset link sent successfully!")
      }
    } catch (error: any) {
      console.error("Forgot password error", error)
      toast.error(error.response?.data?.message || "Failed to send reset link.")
    } finally {
      setLoading(false)
    }
  }

  // 2. Handle "Update Password" (Reset Password)
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!token) {
      toast.error("Invalid or missing reset token.")
      setLoading(false)
      return
    }

    try {
      // calling the reset server action
      const result = await resetPassword(token, newPassword)

      if (result.success) {
        setIsResetSuccess(true)
        toast.success(result.message || "Password updated successfully!")

        // Optional: Redirect after delay
        setTimeout(() => router.push("/login"), 3000)
      }
    } catch (error: any) {
      console.error("Reset password error", error)
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Token may be invalid or expired."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-pink-100 bg-white p-8 shadow-xl md:p-9">
        {/* --- HEADER LOGIC --- */}
        <div className="space-y-2 text-center">
          <HeadingText
            h3={
              token
                ? isResetSuccess
                  ? "All Set!"
                  : "Reset Password"
                : "Forgot Password?"
            }
            subtext=""
          />
          <h1 className="font-sans font-light text-muted-foreground text-slate-500 lg:text-sm">
            {token
              ? isResetSuccess
                ? "Your password has been successfully updated."
                : "Please enter your new password below."
              : isSubmitted
                ? "Check your inbox! We've sent you a link."
                : "Enter your email and we'll send you a reset link."}
          </h1>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}
        {/* Token present */}
        {token ? (
          isResetSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-6 pt-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <Link href="/login" className="w-full">
                <Button className="h-12 w-full rounded-full bg-pink-700 text-lg hover:bg-pink-800">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <Input
                    required
                    type="password"
                    id="new-password"
                    placeholder="••••••••"
                    className="border-pink-100 bg-pink-50/30 pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <Input
                    required
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="border-pink-100 bg-pink-50/30 pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isPasswordValid || loading}
                className="mt-6 h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg hover:bg-pink-800"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          )
        ) : // Token not present
        isSubmitted ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-pink-50 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <Send className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Link Sent!</p>
                <p className="text-xs text-slate-500">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="font-semibold text-pink-700">{email}</span>
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-12 w-full rounded-full border-pink-200 text-pink-700 hover:bg-pink-50"
              onClick={() => setIsSubmitted(false)}
            >
              Resend Link
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  required
                  type="email"
                  id="email"
                  placeholder="admin@thewhiskcorner.com"
                  className="border-pink-100 bg-pink-50/30 pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={!isEmailValid || loading}
              className="mt-6 h-12 w-full gap-2 rounded-full bg-pink-700 text-lg text-white shadow-lg hover:bg-pink-800"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}

        {/* BACK TO LOGIN (Always visible unless success state covers it) */}
        {!isResetSuccess && (
          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-pink-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
