"use client"

import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { CakeTable } from "@/types/contents"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const ActionCell = ({ cake }: { cake: CakeTable }) => {
  // Access the client to refresh data after updates
  const queryClient = useQueryClient()
  const router = useRouter()

  // Handle Delete (DELETE)
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this cake? This cannot be undone."
      )
    )
      return

    try {
      const response = await fetch(`/api/cakes/${cake.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Request deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["admin-cakes"] })
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete request")
    }
  }

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
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4 " />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleDelete}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Cake
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ActionCell
