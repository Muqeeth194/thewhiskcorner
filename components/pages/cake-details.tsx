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
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { Loader2, Pencil } from "lucide-react"

export default function CakeDetailsPage() {
  const [categoryCakes, setCategoryCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(false)
  const [cake, setCake] = useState<Cake>()

  const searchParams = useSearchParams()
  const searchId = searchParams.get("id")
  const { isLoggedIn, user } = useAuth()

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

  if (loading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 py-20">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-pink-200/50" />
          <Loader2 className="relative z-10 h-12 w-12 animate-spin text-pink-700" />
        </div>

        <p className="text-md animate-pulse font-serif italic tracking-wide text-pink-900/80">
          Baking your cakes...
        </p>
      </div>
    )
  }

  return (
    <main className="items-left container flex flex-col py-4">
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

      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:items-start">
        {/* COVER IMAGE */}
        <div className="flex w-full items-center justify-center p-2 lg:w-1/2">
          {cake && (
            <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-xl shadow-lg lg:sticky lg:top-8">
              <Image
                src={cake.image}
                alt={cake.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>

        {/* 0. DETAILS SECTION */}
        <div className="flex w-full flex-col justify-start p-4 md:p-4 lg:w-1/2">
          {cake && (
            <div className="flex flex-col items-start gap-8 text-left">
              {/* 1. HEADER SECTION */}
              <div className="space-y-3">
                <div className="flex w-full items-center justify-between">
                  {/* Category Badge  */}
                  <span className="inline-block rounded-full bg-pink-200 px-4 py-1.5 text-sm font-semibold tracking-wide text-pink-800 antialiased drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
                    {cake.category}
                  </span>

                  {/* Admin Edit Button */}
                  {user?.isAdmin && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-full  border-pink-300 bg-white/50 text-base text-pink-800 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-pink-800 hover:text-white hover:shadow-2xl"
                    >
                      <Link href={`/admin/cakes/editor?id=${cake.id}`}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Category Title (Stays on its own line below) */}
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
                    Object.entries(
                      typeof cake.details === "string"
                        ? JSON.parse(cake.details)
                        : cake.details
                    ).map(([key, value], index) => (
                      <li key={index} className="capitalize">
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
                          <Image
                            src={cake.image}
                            alt={cake.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
