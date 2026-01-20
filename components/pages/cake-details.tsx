"use client"

import { Cake } from "@/types/contents"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button, buttonVariants } from "../ui/button"
import Link from "next/link"
import HeadingText from "../heading-text"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getOptimizedUrl } from "@/lib/cloudinary/optimizer"
import axios from "axios"

export default function CakeDetailsPage() {
  const [categoryCakes, setCategoryCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(false)
  const [cake, setCake] = useState<Cake>()

  const searchParams = useSearchParams()
  const searchId = searchParams.get("id")

  useEffect(() => {
    const fetchData = async () => {
      if (!searchId) return // Dont fetch anything if no ID exists

      try {
        setLoading(true)
        const idResponse = await fetch(`/api/cakes/${searchId}`)
        if (!idResponse.ok) throw new Error("Failed to fetch")
        const cakeData = await idResponse.json()
        // In order to populate the data of the 'details' object it needs to be in JSON format.
        // Check if 'details' is a string. If so, parse it to JSON.
        let parsedDetails = { servings: "", flavor: "", leadTime: "" }

        if (typeof cakeData.details === "string") {
          try {
            parsedDetails = JSON.parse(cakeData.details)
          } catch (e) {
            console.error("Could not parse details JSON", e)
          }
        } else if (
          typeof cakeData.details === "object" &&
          cakeData.details !== null
        ) {
          // It might already be an object if your DB driver handled it
          parsedDetails = cakeData.details
        }

        // Merge parsed details back into the object
        const finalCake = { ...cakeData, details: parsedDetails }
        setCake(finalCake)

        // Fetch the Similar cakes
        if (finalCake.category) {
          try {
            const params = new URLSearchParams({
              category: finalCake.category,
              limit: "12",
            })

            const similarResponse = await fetch(`/api/cakes?${params}`)
            const similarData = await similarResponse.json()

            const similarList = (similarData.cakes || []).filter(
              (c: Cake) => c.id !== finalCake.id
            )

            setCategoryCakes(similarList)
          } catch (error) {
            console.error("Failed to fetch similar cakes", error)
          }
        }
      } catch (error) {
        console.error("failed to fetch the cakes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchId])

  console.log("Fetched cake", cake)

  if (loading) {
    return <div className="py-10 text-center">Loading the cakes ...</div>
  }

  return (
    <main className="items-left container flex flex-col py-6">
      {/* BREADCRUMBS */}
      <Breadcrumb className="px-4 md:p-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cake Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* UPDATED: flex-col for mobile (stacking), lg:flex-row for desktop (side-by-side) */}
      <div className="item-center flex w-full flex-col justify-between gap-8 lg:flex-row">
        {/* COVER IMAGE */}
        {/* UPDATED: w-full for mobile, lg:w-1/2 for desktop */}
        <div className="flex w-full items-center justify-center p-3 lg:w-1/2">
          {cake && (
            <img
              src={getOptimizedUrl(cake.image, 1000)}
              alt={cake.name}
              className="aspect-square h-auto w-full max-w-[480px] rounded-xl object-cover drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]"
            />
          )}
        </div>

        {/* 0. DETAILS SECTION */}
        {/* UPDATED: p-4 for mobile, md:p-8 for tablet, lg:w-1/2 for desktop */}
        <div className="flex w-full flex-col justify-center p-4 md:p-8 lg:w-1/2 lg:p-3">
          {cake && (
            <div className="flex flex-col items-start gap-8 text-left">
              {/* 1. HEADER SECTION */}
              <div className="space-y-4">
                {/* Category Badge */}
                <span className="inline-block rounded-full bg-pink-200 px-4 py-1.5 text-sm font-semibold tracking-wide text-pink-800 antialiased drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
                  {cake.category}
                </span>

                {/* Category Title */}
                <HeadingText className="tracking-tight text-slate-900">
                  {cake.name}
                </HeadingText>
              </div>

              {/* 2. DESCRIPTION SECTION */}
              <div className="space-y-2 rounded-xl bg-pink-200 p-3 antialiased drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  {cake.description}
                </p>
              </div>

              {/* 3. DETAILS SECTION */}
              <div className="space-y-2 rounded-xl bg-pink-200 p-3 antialiased drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">
                  Details
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-sm leading-relaxed text-slate-700">
                  {cake && cake.details ? (
                    // CHECK: If details is a string (from DB), parse it. If it's already an object, use it.
                    Object.entries(
                      typeof cake.details === "string"
                        ? JSON.parse(cake.details)
                        : cake.details
                    ).map(([key, value], index) => (
                      <li key={index} className="capitalize">
                        {/* Formats "leadTime" to "Lead Time" roughly, or just prints the key */}
                        <span className="font-semibold">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>{" "}
                        {String(value)}
                      </li>
                    ))
                  ) : (
                    <li>No details available</li>
                  )}
                </ul>
              </div>

              {/* 4. ACTION BUTTON */}
              <div className="pt-0">
                <Button
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "hover:bg-black-300 w-fit rounded-full border-2 border-pink-800 bg-pink-700 px-6 py-4 font-sans text-lg font-semibold tracking-wider text-white shadow-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-105 hover:bg-pink-800 hover:text-white hover:shadow-2xl md:px-8 md:py-5 md:text-base lg:px-10 lg:py-2 lg:text-lg"
                  )}
                >
                  <Link href={`/quote-form?cakeId=${cake.id}`}>
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SIMILAR CAKES CAROUSEL */}
      {categoryCakes.length > 0 && (
        <div className="mt-10 flex w-full flex-col items-center space-y-6">
          <h3 className="font-serif text-xl font-bold text-pink-950 antialiased drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] lg:text-2xl">
            You might also like
          </h3>

          <Carousel className="w-full max-w-sm px-4 md:max-w-2xl md:px-0 lg:max-w-6xl">
            <CarouselContent className="-ml-2 md:-ml-4">
              {categoryCakes.map((cake) => (
                <CarouselItem
                  key={cake.id}
                  className="basis-[70%] pl-1 md:basis-1/2 lg:basis-1/5"
                >
                  <div className="p-2">
                    <Link
                      key={cake.id}
                      href={`cake?id=${cake.id}`}
                      className="group mx-auto block h-full w-full max-w-[200px]"
                    >
                      <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300">
                        {/* Image Container with Zoom Effect */}
                        <CardContent className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 p-0 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                          <img
                            src={getOptimizedUrl(cake.image, 500)}
                            alt={cake.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Subtle gradient overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                        </CardContent>

                        <CardFooter className="flex flex-col items-start px-1 py-4">
                          <CardTitle className="line-clamp-1 font-serif text-lg font-semibold tracking-tight text-slate-800 group-hover:text-pink-700 dark:text-slate-200">
                            {cake.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {cake.category}
                          </p>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </main>
  )
}
