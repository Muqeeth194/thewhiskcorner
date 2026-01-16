"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import Link from "next/link"
import { getOptimizedUrl } from "@/lib/cloudinary/optimizer"
import { Loader2 } from "lucide-react"
import CategoryFilter from "../filters/category-filter"
import FlavorFilter from "../filters/flavor-filter"
import { useInfiniteQuery } from "@tanstack/react-query"

async function fetchCakesAPI({ pageParam = 1, category, flavor }: any) {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: "12",
  })
  if (category) params.append("category", category)
  if (flavor) params.append("flavor", flavor)

  const response = await fetch(`/api/cakes?${params}`)
  return response.json()
}

export default function GalleryPage() {
  // Filters
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [isFlavorOpen, setIsFlavorOpen] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement>(null)

  // ✅ Infinite query with React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cakes", selectedCategories, selectedFlavors],
    queryFn: ({ pageParam = 1 }) =>
      fetchCakesAPI({
        pageParam,
        category: selectedCategories.join(","),
        flavor: selectedFlavors.join(","),
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
  })

  // ✅ Intersection Observer for infinite scroll
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

  // ✅ Flatten pages into single array
  const cakes = data?.pages.flatMap((page) => page.cakes) ?? []

  return (
    <main className="container flex space-x-8 px-2">
      {/* SIDEBAR FILTERS */}
      <div className="flex w-1/4 flex-col items-start space-y-4">
        <div className="sticky top-20 z-10 max-h-[calc(100vh-100px)] w-full space-y-4 overflow-y-auto pr-2">
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
                >
                  <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300">
                    <CardContent className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 p-0 shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-shadow duration-300 group-hover:shadow-xl">
                      <img
                        src={getOptimizedUrl(cake.image, 500)}
                        alt={cake.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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
            You've reached the end! 🎂
          </div>
        )}
      </div>
    </main>
  )
}
