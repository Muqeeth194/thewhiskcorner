import LoginForm from "@/components/pages/login-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function LoginPage() {
  const sessionToken = cookies().get("session_token")

  if (sessionToken) {
    redirect("/")
  }
  return (
    <div className="min-h-svh grid lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="mx-auto w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
