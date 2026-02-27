import React from "react"
import GalleryPage from "@/components/pages/gallery"
import HeadingText from "@/components/heading-text"

const page = () => {
  return (
    <main className="container flex flex-col items-center">
      <div className="flex flex-col items-center space-y-2 py-8 text-center">
        <HeadingText subtext="Explore our handcrafted cakes">
          Our Creations
        </HeadingText>
      </div>
      <GalleryPage />
    </main>
  )
}

export default page
