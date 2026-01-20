"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Eye,
  Trash,
  Copy,
  CheckCircle2,
  XCircle,
  Loader2,
  Phone,
  User,
  Instagram,
  Calendar,
  Cake,
  CopyIcon,
} from "lucide-react"
import { QuoteRequest } from "@/types/contents"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

interface QuoteActionCellProps {
  quote: QuoteRequest
}

export default function QuoteActionCell({ quote }: QuoteActionCellProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Access the client to refresh data after updates
  const queryClient = useQueryClient()

  // copy contact to clipboard
  const copyContact = () => {
    navigator.clipboard.writeText(quote.contact)
    toast.success("Contact info copied!")
  }

  // Handle Status Update (PUT)
  const handleStatusUpdate = async (newStatus: boolean) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/quote", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: quote.id, isAttended: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      toast.success(
        newStatus ? "Request marked as Attended" : "Request marked as Open"
      )

      // ✅ Refresh the table automatically
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] })

      // Optional: Close dialog on success
      setIsDetailsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Delete (DELETE)
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this request? This cannot be undone."
      )
    )
      return

    try {
      const response = await fetch(`/api/quote?id=${quote.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Request deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] })
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete request")
    }
  }

  return (
    <div className="text-right font-medium">
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Full Details
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleDelete}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* VIEW DETAILS MODAL */}
        <DialogContent className="border-rounded p-4 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Quote Request Details
              {/* Status Badge in Header */}
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] ${quote.isAttended ? "border-green-200 bg-green-50 text-green-700" : "border-yellow-200 bg-yellow-50 text-yellow-700"}`}
              >
                {quote.isAttended ? "Attended" : "Open"}
              </span>
            </DialogTitle>
            <DialogDescription>
              Submitted on {new Date(quote.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* 1. CONTACT SECTION */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="mr-1 h-3 w-3" /> Customer Name
                </div>
                <p className="text-sm font-medium">{quote.name}</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center text-xs font-medium text-slate-500">
                  <Phone className="mr-1.5 h-3.5 w-3.5" />
                  Contact Info
                </div>

                <div className="flex items-center justify-between rounded-md border border-slate-100 bg-white p-2 shadow-sm transition-colors hover:border-pink-200">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {quote.contact}
                  </p>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyContact}
                    className="h-6 w-6 shrink-0 text-slate-400 hover:bg-pink-50 hover:text-pink-600"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {quote.instagram && (
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Instagram className="mr-1 h-3 w-3" /> Instagram
                  </div>
                  <p className="text-sm font-medium text-pink-600">
                    {quote.instagram}
                  </p>
                </div>
              )}
            </div>

            {/* 2. ORDER DETAILS GRID */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Requirements
              </h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-sm">
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Category:
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Cake className="h-3 w-3 text-pink-500" /> {quote.type}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Flavour:
                  </span>
                  <span className="font-medium">
                    {quote.flavour || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Guest Count:
                  </span>
                  <span className="font-medium">
                    {quote.servings || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Budget:
                  </span>
                  <span className="font-medium text-green-700">
                    {quote.budget || "Not specified"}
                  </span>
                </div>
                {quote.selectedCakeName && (
                  <div className="col-span-2 mt-1 rounded-md border border-pink-100 bg-pink-50/50 p-2">
                    <span className="block text-xs text-muted-foreground">
                      Reference Cake:
                    </span>
                    <span className="font-medium text-pink-900">
                      {quote.selectedCakeName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 3. MESSAGE SECTION */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customization Message
              </h4>
              <div className="rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">
                {quote.message}
              </div>
            </div>
          </div>

          {/* 4. ACTIONS FOOTER */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>

            {/* TOGGLE STATUS BUTTON */}
            <Button
              onClick={() => handleStatusUpdate(!quote.isAttended)}
              disabled={isLoading}
              className={
                quote.isAttended
                  ? "border-yellow-200 bg-yellow-100 text-yellow-900 hover:bg-yellow-200"
                  : "bg-green-600 text-white hover:bg-green-700"
              }
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : quote.isAttended ? (
                <>
                  <XCircle className="mr-2 h-4 w-4" /> Mark as Open
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Attended
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
