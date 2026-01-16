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
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, SearchIcon } from "lucide-react"
import CategoryFilter from "../filters/category-filter"
import StatusFilter from "../filters/status-filter"
import FlavorFilter from "../filters/flavor-filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  isLoading?: boolean
  isError?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([])
  const [isStatusOpen, setIsStatusOpen] = React.useState(false)
  const [selectedFlavors, setSelectedFlavors] = React.useState<string[]>([])
  const [isFlavorOpen, setIsFlavorOpen] = React.useState(false)

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

  React.useEffect(() => {
    table
      .getColumn("category")
      ?.setFilterValue(
        selectedCategories.length > 0 ? selectedCategories : undefined
      )
  }, [selectedCategories])

  React.useEffect(() => {
    table
      .getColumn("status")
      ?.setFilterValue(selectedStatus.length > 0 ? selectedStatus : undefined)
  }, [selectedStatus])

  return (
    <div className="container flex flex-col gap-6 px-4 pt-4 lg:flex-row lg:px-0">
      {/* SIDEBAR FILTERS */}
      <div className="max-h-[calc(100vh-150px)] w-full space-y-4 overflow-y-auto pr-2 lg:w-1/4">
        {/* CATEGORY FILTER */}
        <CategoryFilter
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* STATUS FILTER */}
        <StatusFilter
          isStatusOpen={isStatusOpen}
          setIsStatusOpen={setIsStatusOpen}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* FLAVOR FILTER */}
        <FlavorFilter
          isFlavorOpen={isFlavorOpen}
          setIsFlavorOpen={setIsFlavorOpen}
          selectedFlavors={selectedFlavors}
          setSelectedFlavors={setSelectedFlavors}
        />
      </div>

      {/* 3. MAIN CONTENT AREA */}
      <div className="w-full">
        {/* FILTER INPUT */}
        <div className="relative flex items-center pb-3">
          <Input
            placeholder="Filter cakes..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full pl-10 pr-4"
          />
          <SearchIcon className="absolute left-3 h-4 w-4 text-slate-400" />
        </div>

        {/* 4. TABLE WRAPPER FOR SCROLLING */}
        {data.length === 0 ? (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-pink-200 bg-pink-50/50">
            {/* Improved Empty State/Loader styling */}
            <Loader2 className="h-8 w-8 animate-spin text-pink-700" />
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg border border-pink-200 bg-white/50 shadow-sm">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader className="bg-pink-300/50 shadow-sm">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="border-pink-100 hover:bg-transparent"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="whitespace-nowrap font-bold text-pink-900 first:rounded-tl-lg last:rounded-tr-lg"
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
                        className="border-pink-100 hover:bg-pink-50/30"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="whitespace-nowrap py-3"
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
