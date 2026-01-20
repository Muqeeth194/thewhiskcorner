"use client"

import { ColumnDef } from "@tanstack/react-table"
import { QuoteRequest } from "@/types/contents"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  Calendar,
  CakeSlice,
  CheckCircle2,
  Circle,
} from "lucide-react"
import QuoteActionCell from "./quote-action-cell"

export const columns: ColumnDef<QuoteRequest>[] = [
  // 1. DATE COLUMN
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start pl-0 font-semibold"
        >
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="text-sm">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )
    },
  },

  // 2. CUSTOMER INFO
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const contact = row.original.contact
      const instagram = row.original.instagram

      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{name}</span>
          <span className="text-xs text-muted-foreground">{contact}</span>
          {instagram && (
            <span className="text-[10px] text-pink-600">{instagram}</span>
          )}
        </div>
      )
    },
  },

  // 3. CAKE DETAILS
  {
    accessorKey: "type",
    header: "Interest",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const selectedCake = row.original.selectedCakeName

      return (
        <div className="flex flex-col">
          <div className="flex items-center font-medium">
            <CakeSlice className="mr-1 h-3 w-3 text-pink-500" />
            {type}
          </div>
          {selectedCake && (
            <span className="line-clamp-1 max-w-[150px] text-xs text-muted-foreground">
              Ref: {selectedCake}
            </span>
          )}
        </div>
      )
    },
  },

  // 4. SPECS
  {
    id: "specs",
    header: "Specs",
    cell: ({ row }) => {
      const servings = row.original.servings
      const budget = row.original.budget
      return (
        <div className="flex flex-col gap-1 text-xs">
          {servings && (
            <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5">
              👥 {servings}
            </span>
          )}
          {budget && (
            <span className="w-fit rounded-md bg-green-50 px-2 py-0.5 text-green-700">
              💰 {budget}
            </span>
          )}
        </div>
      )
    },
  },

  // 5. ✅ NEW STATUS COLUMN
  {
    accessorKey: "isAttended",
    header: "Status",
    cell: ({ row }) => {
      const isAttended = row.getValue("isAttended") as boolean
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
            isAttended
              ? "bg-green-100 text-green-800" // Green for attended
              : "bg-yellow-100 text-yellow-800" // Yellow for open
          }`}
        >
          {isAttended ? (
            <>
              <CheckCircle2 className="mr-1 h-3 w-3" /> Attended
            </>
          ) : (
            <>
              <Circle className="mr-1 h-3 w-3" /> Open
            </>
          )}
        </div>
      )
    },
    // Allows filtering: returns true if the row value matches the filter
    filterFn: (row, columnId, filterValue) => {
      // We convert boolean to string ("true"/"false") to match standard select filters
      const rowValue = String(row.getValue(columnId))
      return filterValue.includes(rowValue)
    },
  },

  // 6. ACTIONS
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <QuoteActionCell quote={row.original} />,
  },
]
