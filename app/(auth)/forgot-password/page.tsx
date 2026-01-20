import ForgotPasswordForm from "@/components/pages/forgotpassword-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function LoginPage() {
  const sessionToken = cookies().get("session_token")

  if (sessionToken) {
    redirect("/")
  }
  return (
    <div className="min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="mx-auto w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
