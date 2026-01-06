"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { verifyUser } from "@/actions/verify" // Import your server action
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  )
  const [message, setMessage] = useState("")
  const hasVerified = useRef(false)

  useEffect(() => {
    // Check for token early
    if (hasVerified.current) return

    if (!token) {
      setStatus("ERROR")
      setMessage("Verification link is invalid. Missing token.")
      return
    }

    const verify = async () => {
      hasVerified.current = true

      try {
        // calling the verify server action
        const result = await verifyUser(token)

        if (result.success) {
          setStatus("SUCCESS")
          setMessage(result.message || "Email verified successfully!")
        } else {
          setStatus("ERROR")
          setMessage(result.message || "Verification failed")
        }
      } catch (error) {
        console.error("Verification error:", error)
        setStatus("ERROR")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    verify()
  }, [token])

  return (
    <main className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-pink-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* LOADING STATE */}
        {status === "LOADING" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-pink-600" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Verifying...
            </h2>
            <p className="text-slate-500">
              Please wait while we activate your account.
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "SUCCESS" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-semibold text-slate-800">Verified!</h2>
            <p className="text-slate-500">
              Your email has been successfully verified.
            </p>
            <Link href="/login">
              <Button className="mt-4 bg-pink-600 hover:bg-pink-700">
                Go to Login
              </Button>
            </Link>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "ERROR" && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-semibold text-slate-800">
              Verification Failed
            </h2>
            <p className="text-slate-500">{message}</p>
            <Link href="/register">
              <Button variant="outline" className="mt-4">
                Back to Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
