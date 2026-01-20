"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, SearchIcon, FilterX } from "lucide-react"

interface QuoteTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function QuoteTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: QuoteTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  // Check if any filters are active to show the Reset button
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="w-full space-y-4">
      {/* 1. TOP TOOLBAR (Search + Filter + Reset) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {/* SEARCH INPUT */}
          <div className="relative flex w-full max-w-sm items-center">
            <Input
              placeholder="Search by customer name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full border-pink-200 bg-white pl-10 pr-4 focus:border-pink-400 focus:ring-pink-200"
            />
            <SearchIcon className="absolute left-3 h-4 w-4 text-pink-400" />
          </div>

          {/* STATUS FILTER DROPDOWN */}
          <Select
            value={
              (table.getColumn("isAttended")?.getFilterValue() as string) ??
              "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("isAttended")
                ?.setFilterValue(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-[160px] border-pink-200 bg-white text-pink-900 focus:ring-pink-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="false">Open (Pending)</SelectItem>
              <SelectItem value="true">Attended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* RESET BUTTON */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 text-pink-700 hover:bg-pink-50 hover:text-pink-900 lg:px-3"
          >
            Reset Filters
            <FilterX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 2. TABLE CONTENT */}
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-pink-200 bg-pink-50/50">
          <Loader2 className="h-8 w-8 animate-spin text-pink-700" />
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-lg border border-pink-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-pink-100 bg-pink-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-pink-100 hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap py-4 font-bold text-pink-900"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-pink-100 transition-colors hover:bg-pink-50/40"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap py-3 align-middle"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-slate-500"
                    >
                      No quotes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* 3. PAGINATION */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} quote(s) total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
