"use client"

import React from "react"
import { QuoteTable } from "../admin/quotes/quote-table"
import { columns } from "../admin/quotes/quote-columns"
import { useQuery } from "@tanstack/react-query"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// 1. Define the fetcher function
async function fetchAllQuotes() {
  const response = await fetch("/api/quote?limit=100")
  if (!response.ok) {
    throw new Error("Failed to fetch quotes")
  }
  return response.json()
}

export default function QuoteRequests() {
  const { data, isError } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: fetchAllQuotes,
  })

  const quotes = data || []

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load admin data.
      </div>
    )
  }

  return (
    <div className="w-full bg-white sm:overflow-hidden sm:rounded-lg sm:border sm:border-pink-100 sm:p-4 sm:shadow-sm">
      <div className="mb-4 px-4 sm:mb-6 sm:ml-2 sm:px-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin"
                className="text-slate-500 transition-colors hover:text-pink-600"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-300" />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-slate-500 transition-colors hover:text-pink-600">
                Quotes
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full overflow-x-auto pb-4">
        {/* We add a min-width to the table container to ensure columns don't collapse too much */}
        <div className="min-w-[800px] sm:min-w-full">
          <QuoteTable columns={columns} data={quotes} />
        </div>
      </div>
    </div>
  )
}
