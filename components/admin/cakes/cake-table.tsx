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
import { Loader2, SearchIcon, FilterX } from "lucide-react"
import CategoryFilter from "@/components/filters/category-filter"
import StatusFilter from "@/components/filters/status-filter"
import FlavorFilter from "@/components/filters/flavor-filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  isLoading?: boolean
  isError?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Filter States
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )

  const [isStatusOpen, setIsStatusOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([])

  const [isFlavorOpen, setIsFlavorOpen] = React.useState(false)
  const [selectedFlavors, setSelectedFlavors] = React.useState<string[]>([])

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

  // 1. Sync Category Filter
  React.useEffect(() => {
    table
      .getColumn("category")
      ?.setFilterValue(
        selectedCategories.length > 0 ? selectedCategories : undefined
      )
  }, [selectedCategories, table])

  // 2. Sync Status Filter
  React.useEffect(() => {
    table
      .getColumn("status")
      ?.setFilterValue(selectedStatus.length > 0 ? selectedStatus : undefined)
  }, [selectedStatus, table])

  // 3. Sync Flavor Filter
  React.useEffect(() => {
    table
      .getColumn("flavor") // Ensure this matches the 'id' in columns.tsx
      ?.setFilterValue(selectedFlavors.length > 0 ? selectedFlavors : undefined)
  }, [selectedFlavors, table])

  // Reset Function
  const resetFilters = () => {
    table.resetColumnFilters()
    setSelectedCategories([])
    setSelectedStatus([])
    setSelectedFlavors([])
  }

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    selectedCategories.length > 0 ||
    selectedStatus.length > 0 ||
    selectedFlavors.length > 0

  // console.log("selected falvor", selectedFlavors)

  return (
    <div className="container flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:px-0">
      {/* 1. SIDEBAR FILTERS */}
      <div className="max-h-[calc(100vh-150px)] w-full space-y-4 overflow-y-auto pr-2 lg:w-1/5">
        <CategoryFilter
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <StatusFilter
          isStatusOpen={isStatusOpen}
          setIsStatusOpen={setIsStatusOpen}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <FlavorFilter
          isFlavorOpen={isFlavorOpen}
          setIsFlavorOpen={setIsFlavorOpen}
          selectedFlavors={selectedFlavors}
          setSelectedFlavors={setSelectedFlavors}
        />

        {/* Reset Button for Mobile/Sidebar context */}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            Reset All Filters <FilterX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="w-full space-y-4">
        {/* SEARCH INPUT */}
        <div className="relative flex w-full max-w-sm items-center">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full border-pink-200 bg-white pl-10 pr-4 focus:border-pink-400 focus:ring-pink-200"
          />
          <SearchIcon className="absolute left-3 h-4 w-4 text-pink-400" />
        </div>

        {/* TABLE CONTENT */}
        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-pink-200 bg-pink-50/50">
            <Loader2 className="h-8 w-8 animate-spin text-pink-700" />
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg border border-pink-200 bg-white shadow-sm">
            <div className="w-full overflow-x-auto">
              <Table>
                {/* Header Styling */}
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

                {/* Body Styling */}
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
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-end space-x-2 py-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} row(s) total.
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
    </div>
  )
}
