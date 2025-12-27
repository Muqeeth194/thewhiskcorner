"use client"

import { MoreHorizontal, Pencil, Trash, Copy } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { CakeTable } from "@/types/contents"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export const columns: ColumnDef<CakeTable>[] = [
  {
    accessorKey: "image",
    header: "Image",
    // Render the image thumbnail
    cell: ({ row }) => {
      return (
        <div className="h-10 w-10 overflow-hidden rounded-md">
          <img
            src={row.getValue("image")}
            alt={row.getValue("name")}
            className="h-full w-full object-cover"
          ></img>
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
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
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter()
      const cake = row.original

      return (
        <div className="text-right font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 border-pink-200 bg-white p-0 hover:bg-pink-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-pink-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => router.push(`/admin/cakes/editor?id=${cake.id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => console.log("Delete", cake.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Cake
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
