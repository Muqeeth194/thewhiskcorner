"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import Link from "next/link"
import { Filter, Loader2, X } from "lucide-react"
import CategoryFilter from "../filters/category-filter"
import FlavorFilter from "../filters/flavor-filter"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import TierFilter from "../filters/tier-filter"
import Image from "next/image"
import { Button } from "../ui/button"

async function fetchCakesAPI({ pageParam = 1, category, flavor, tier }: any) {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: "12",
  })
  if (category) params.append("category", category)
  if (flavor) params.append("flavor", flavor)
  if (tier) params.append("tier", tier)

  const response = await fetch(`/api/cakes?${params}`)
  return response.json()
}

export default function GalleryPage() {
  const searchParams = useSearchParams()
  const categoryFromURL = searchParams.get("category")

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  // Filters
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromURL ? [categoryFromURL] : []
  )
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [isFlavorOpen, setIsFlavorOpen] = useState(false)

  const [selectedTier, setSelectedTier] = useState<string[]>([])
  const [isTierOpen, setIsTierOpen] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Infinite query with React Query
  // Whenever the user changes a filter (or when the page loads with the initial URL filter), React Query automatically detects the change in the key and triggers fetchCakesAPI.
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cakes", selectedCategories, selectedFlavors, selectedTier],
    queryFn: ({ pageParam = 1 }) =>
      fetchCakesAPI({
        pageParam,
        category: selectedCategories.join(","),
        flavor: selectedFlavors.join(","),
        tier: selectedTier.join(","),
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
  })

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || isFetchingNextPage || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, isFetchingNextPage, hasNextPage])

  // Freeze background scrolling when the mobile filter menu is open
  useEffect(() => {
    if (isFilterMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup just in case the component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFilterMenuOpen])

  // Flatten pages into single array
  const cakes = data?.pages.flatMap((page) => page.cakes) ?? []

  return (
    <main className="container px-6 md:flex md:justify-between md:gap-6">
      {/* MOBILE HEADER & FILTER BUTTON WRAPPER */}
      <div className="relative mb-6 flex w-full flex-col items-end md:hidden">
        {/* THE OPEN BUTTON */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterMenuOpen(true)}
          className={`gap-2 rounded-full border-pink-300 bg-white/50 text-base text-pink-800 backdrop-blur-sm transition-all duration-300 ${
            isFilterMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          Filter
          <Filter className="h-4 w-4" />
        </Button>

        {/* MOBILE FILTER MENU */}
        {isFilterMenuOpen && (
          <div className="absolute right-0 top-0 z-50 max-h-[60vh] w-full origin-top-right overflow-y-auto rounded-2xl border border-pink-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md duration-300 animate-in fade-in zoom-in-75 dark:border-slate-800 dark:bg-slate-900/95">
            {/* STICKY CLOSE BUTTON */}
            <div className="pointer-events-none sticky top-0 z-50 flex h-0 w-full justify-end">
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsFilterMenuOpen(false)}
                className="pointer-events-auto rounded-full bg-pink-200 text-base text-pink-800 shadow-md transition-all duration-200 hover:scale-105 hover:bg-pink-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* THE FILTERS */}
            <div className="mt-2 grid grid-cols-1 gap-6">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Filter
              </h1>
              <CategoryFilter
                isCategoryOpen={isCategoryOpen}
                setIsCategoryOpen={setIsCategoryOpen}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />

              <FlavorFilter
                isFlavorOpen={isFlavorOpen}
                setIsFlavorOpen={setIsFlavorOpen}
                selectedFlavors={selectedFlavors}
                setSelectedFlavors={setSelectedFlavors}
              />

              <TierFilter
                isTierOpen={isTierOpen}
                setIsTierOpen={setIsTierOpen}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
              />
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR FILTERS */}
      <div className="mb-4 hidden w-1/5 flex-col justify-items-start space-y-4 md:flex">
        <div className="sticky top-24 z-10 max-h-[calc(100vh-100px)] w-full space-y-4 overflow-y-auto pb-12 pr-2">
          <CategoryFilter
            isCategoryOpen={isCategoryOpen}
            setIsCategoryOpen={setIsCategoryOpen}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <FlavorFilter
            isFlavorOpen={isFlavorOpen}
            setIsFlavorOpen={setIsFlavorOpen}
            selectedFlavors={selectedFlavors}
            setSelectedFlavors={setSelectedFlavors}
          />

          <TierFilter
            isTierOpen={isTierOpen}
            setIsTierOpen={setIsTierOpen}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
          />
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="w-full">
        {/* Error State */}
        {isError && (
          <div className="py-10 text-center text-red-500">
            Failed to load cakes. Please try again.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && cakes.length === 0 && (
          <div className="py-10 text-center text-slate-500">
            No cakes found matching your filters.
          </div>
        )}

        <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {isLoading
            ? // SKELETON LOADER (Show on initial load)
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))
            : // ACTUAL CAKE CARDS
              cakes.map((cake: any) => (
                <Link
                  key={cake.id} // Ensure ID is unique across pages
                  href={`cake?id=${cake.id}`}
                  className="group mx-auto block h-full w-full max-w-[240px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="h-full border-0 bg-transparent shadow-none transition-transform duration-300 hover:scale-105">
                    <CardContent className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 p-0 shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-shadow duration-700 group-hover:shadow-xl">
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                    </CardContent>

                    <CardFooter className="flex flex-col items-start px-1 py-4">
                      <CardTitle className="line-clamp-1 font-serif text-base font-semibold tracking-tight text-slate-800 group-hover:text-pink-700 dark:text-slate-200 md:text-lg">
                        {cake.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground md:text-sm">
                        {cake.category}
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
        </div>

        {/* INFINITE SCROLL LOADER TRIGGER */}
        <div
          ref={loadMoreRef}
          className="flex min-h-[50px] justify-center py-8"
        >
          {(isFetchingNextPage || (isLoading && cakes.length > 0)) && (
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          )}
        </div>

        {/* END OF RESULTS */}
        {!hasNextPage && !isLoading && cakes.length > 0 && (
          <div className="pb-8 text-center text-sm text-slate-500">
            You&apos;ve reached the end! 🎂
          </div>
        )}
      </div>
    </main>
  )
}
