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
      <div className="flex flex-row items-center gap-5 py-5 text-center">
        {cakeFilterSection.content.map((filter) => {
          const isActive = currentFilter === filter.name
          return (
            <Link
              key={filter.name}
              className={cn(
                buttonVariants({
                  variant: isActive ? "default" : "outline",
                  size: "sm",
                }),
                "rounded-full px-6 transition-all"
              )}
              href={`?filter=${filter.name}&page=1`}
            >
              {filter.name}
            </Link>
          )
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : currentCakes.length > 0 ? (
          currentCakes.map((cake) => (
            <Card key={cake.id}>
              <CardContent>
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="h-64 w-full object-cover transition-transform hover:scale-105"
                />
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <CardTitle className="text-lg">{cake.name}</CardTitle>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-muted-foregroundl col-span-full text-center">
            No cakes found in this category
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="py-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : undefined
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
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageURL(currentPage + 1)
                    : "#"
                }
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  )
}
