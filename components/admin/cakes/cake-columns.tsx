"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CakeTable } from "@/types/contents"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ActionCell from "./action-cell"
import Link from "next/link"
import Image from "next/image"

// Helper function to inject Cloudinary transformations
const getThumbnailUrl = (url: string) => {
  if (!url) return ""
  if (!url.includes("cloudinary")) return url // Safety check

  // We inject:
  // w_100: Width 100px (approx 2x your 36px container for Retina screens)
  // h_100: Height 100px
  // c_fill: Crop to fill (prevents stretching)
  // q_auto: Automatic quality optimization
  // f_auto: Automatic format (serves AVIF/WebP to supported browsers)
  return url.replace("/upload/", "/upload/w_100,h_100,c_fill,q_auto,f_auto/")
}

export const columns: ColumnDef<CakeTable>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string

      return (
        <div className="relative h-9 w-9 overflow-hidden rounded-md border border-slate-100">
          <Image
            src={getThumbnailUrl(imageUrl) || "/images/placeholder-cake.png"}
            alt={row.getValue("name") || "Cake thumbnail"}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/admin/cakes/editor?id=${row.original.id}`}
        className="font-medium text-slate-900 hover:text-pink-600 hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start pl-0 font-semibold"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      const rowValue = row.getValue(columnId) as string
      return filterValue.includes(rowValue)
    },
  },

  {
    accessorKey: "flavor",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start pl-0 font-semibold"
        >
          Flavor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const flavor = row.getValue("flavor") as string

      return (
        <div
          className="max-w-[200px] truncate capitalize text-slate-600"
          title={flavor}
        >
          {flavor || <span className="text-slate-300">--</span>}
        </div>
      )
    },
    // Exact match within comma-separated list
    filterFn: (row, columnId, filterValue) => {
      // console.log("filter value in the columns file", filterValue)

      // If no filter selected, show all
      if (
        !filterValue ||
        (Array.isArray(filterValue) && filterValue.length === 0)
      ) {
        return true
      }

      // Get the row string (e.g., "Chocolate, Vanilla")
      const rowValue = row.getValue(columnId) as string
      if (!rowValue) return false

      // Split into array: ["Chocolate", "Vanilla"]
      const rowFlavors = rowValue.split(",").map((f) => f.trim().toLowerCase())

      // console.log("rowFlavors value of the table", rowFlavors)

      // Check Intersection: Return true if ANY selected filter is in the row's flavor list
      return filterValue.some((selectedFilter: string) =>
        rowFlavors.includes(selectedFilter.toLowerCase())
      )
    },
  },
  {
    accessorKey: "tier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start pl-0 font-semibold"
        >
          Tier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tier = row.getValue("tier") as number | string

      return (
        <div className="text-slate-600">
          {tier ? (
            <span>
              {tier} Tier{Number(tier) > 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-slate-300">--</span>
          )}
        </div>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      const rowValue = String(row.getValue(columnId))
      return filterValue.includes(rowValue)
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start pl-0 font-semibold"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            status === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-yellow-50 text-yellow-700"
          }`}
        >
          {status}
        </span>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      const rowValue = row.getValue(columnId) as string
      return filterValue.includes(rowValue)
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionCell cake={row.original} />,
  },
]
