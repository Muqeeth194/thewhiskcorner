import HeadingText from "@/components/heading-text"
import CakeDetailsPage from "@/components/pages/cake-details"
import { useSearchParams } from "next/navigation"
import React from "react"

const page = () => {
  return (
    <main className="container flex flex-col items-center">
      <CakeDetailsPage />
    </main>
  )
}

export default page
