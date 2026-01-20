"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CakeTable } from "@/types/contents"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ActionCell from "./action-cell"

export const columns: ColumnDef<CakeTable>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="h-9 w-9 overflow-hidden rounded-md border border-slate-100">
          <img
            src={row.getValue("image")}
            alt={row.getValue("name")}
            className="h-full w-full object-cover"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.getValue("name")}</div>
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
    id: "flavor",
    // 1. Safe Accessor: Parses JSON string if needed, or reads object directly
    accessorFn: (row) => {
      const details = row.details
      if (!details) return ""

      if (typeof details === "string") {
        try {
          const parsed = JSON.parse(details)
          return parsed.flavor || ""
        } catch (e) {
          return ""
        }
      }
      // @ts-ignore - Handle case where details is already an object
      return details.flavor || ""
    },
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
