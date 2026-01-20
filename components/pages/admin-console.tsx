"use client"

import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { columns } from "../admin/cakes/cake-columns"
import { DataTable } from "../admin/cakes/cake-table"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

// 1. Define the fetcher function
async function fetchAllCakes() {
  // We request a higher limit (e.g., 100) to populate the admin table
  // so client-side searching/filtering works well.
  const response = await fetch("/api/cakes?limit=100")
  if (!response.ok) {
    throw new Error("Failed to fetch cakes")
  }
  return response.json()
}

export default function AdminConsole() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-cakes"], // Unique key for caching
    queryFn: fetchAllCakes,
  })

  const cakes = data?.cakes || []

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load admin data.
      </div>
    )
  }

  return (
    <main className="container mx-auto px-2 py-0">
      <div className="flex w-full flex-col gap-3 pb-6 sm:flex-row sm:items-center">
        <Button
          asChild
          variant="outline"
          className="w-full rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white sm:w-auto"
        >
          <Link href="/admin/cakes/new">+ Add New Cake</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full rounded-full border-pink-700 bg-pink-700 px-6 text-base text-white shadow-md hover:bg-pink-800 hover:text-white sm:w-auto"
        >
          <Link href="/quote-requests">View Quote Requests</Link>
        </Button>
      </div>

      {/* GALLERY TABLE VIEW */}
      <div className="w-full overflow-hidden rounded-lg border border-pink-100 p-2 shadow-sm">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={cakes} />
        </div>
      </div>
    </main>
  )
}
