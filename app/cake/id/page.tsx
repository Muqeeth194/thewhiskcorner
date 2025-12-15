import HeadingText from "@/components/heading-text"
import CakeDetailsPage from "@/components/pages/cake-details"
import React from "react"

const page = () => {
  return (
    <main className="container flex flex-col items-center">
      <div className="flex flex-col items-center space-y-2 py-14 text-center">
        <HeadingText subtext="Explore our handcrafted cakes">
          Cake Details
        </HeadingText>
      </div>
      <CakeDetailsPage />
    </main>
  )
}

export default page
