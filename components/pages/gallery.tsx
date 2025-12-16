"use client"
import { cakeFilterSection } from "@/config/contents"
import React, { useEffect, useState } from "react"
import { Button, buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Cake } from "@/types/contents"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function GalleryPage() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const currentFilter = searchParams.get("filter") || "All"
  const currentPageParam = searchParams.get("page")

  // 1. NEW EFFECT: Force Scroll to Top
  // Runs whenever the Filter or Page Number changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentFilter, currentPageParam])

  useEffect(() => {
    async function fetchCakes() {
      try {
        const response = await fetch("/api/cakes")
        const data = await response.json()
        setCakes(data)
      } catch (error) {
        console.error("Failed to fetch cakes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCakes()
  }, [])

  const filteredCakes = cakes.filter((cake) => {
    if (currentFilter === "All") return true

    return cake.category.toLowerCase() === currentFilter.toLowerCase()
  })

  const ITEMS_PER_PAGE = 8

  const currentPage = Number(searchParams.get("page")) || 1

  const totalItems = filteredCakes.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const currentCakes = filteredCakes.slice(startIndex, endIndex)

  const createPageURL = (pageNumber: any) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  if (isLoading) {
    return <div className="py-10 text-center">Loading tasty cakes ...</div>
  }

  return (
    <main className="container flex flex-col items-center">
      {/* Filter section */}
      <div className="flex flex-row items-center gap-5 space-x-2 pb-10 text-center">
        {cakeFilterSection.content.map((filter) => {
          const isActive = currentFilter === filter.name
          return (
            <Link
              key={filter.name}
              className={cn(
                buttonVariants({
                  variant: isActive ? "default" : "outline",
                  size: "lg",
                }),
                "rounded-full px-6 font-serif text-base font-medium antialiased drop-shadow-[0_1px_8px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:shadow-lg "
              )}
              href={`?filter=${filter.name}&page=1`}
            >
              {filter.name}
            </Link>
          )
        })}
      </div>

      {/* GALLERY GRID */}
      <div className="mt-8 grid w-full grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {isLoading ? (
          // SKELETON LOADER (Modern Loading State)
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))
        ) : currentCakes.length > 0 ? (
          currentCakes.map((cake) => (
            <Link
              key={cake.id}
              href={`cake?id=${cake.id}`}
              className="group mx-auto block h-full w-full max-w-[240px]"
            >
              <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300">
                {/* Image Container with Zoom Effect */}
                <CardContent className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 p-0 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <img
                    src={cake.image}
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
          ))
        ) : (
          <div className="col-span-full flex h-60 flex-col items-center justify-center space-y-4 text-center">
            <p className="text-xl font-medium text-muted-foreground">
              No cakes found here 🍰
            </p>
            <Button variant="outline" asChild>
              <Link href="?filter=All&page=1">View all cakes</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="py-6">
          <PaginationContent>
            <PaginationItem className="rounded-full transition-all hover:scale-105 hover:shadow-lg">
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1
                    ? "pointer-events-none rounded-full opacity-50"
                    : "rounded-full"
                }
              />
            </PaginationItem>

            {/*Page number loop */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={createPageURL(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="rounded-full transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem className="rounded-full transition-all hover:scale-105 hover:shadow-lg">
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageURL(currentPage + 1)
                    : "#"
                }
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none rounded-full opacity-50"
                    : "rounded-full"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  )
}
