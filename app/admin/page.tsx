import React from "react"
import HeadingText from "@/components/heading-text"
import AdminConsole from "@/components/pages/admin-console"

const page = () => {
  return (
    <main className="container flex flex-col items-center">
      <div className="flex flex-col items-center space-y-2 py-12 text-center">
        <HeadingText subtext="Manage your gallery and orders">
          Admin Console
        </HeadingText>
      </div>
      <AdminConsole />
    </main>
  )
}

export default page
