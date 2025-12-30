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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { ChevronsUpDown, SearchIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "../ui/label"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  ) // used [] for mutiple categories

  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]) // used [] for status

  const [isStatusOpen, setIsStatusOpen] = React.useState(false)
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
    <div className="container flex px-0 pt-4">
      <div className="w-1/4 space-y-4">
        {/* CATEGORY FILTER */}
        <Collapsible
          open={isCategoryOpen}
          onOpenChange={setIsCategoryOpen}
          className="flex w-full flex-col gap-2"
        >
          {/* Header */}
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between px-2">
              <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
                Category
              </h4>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-slate-400 hover:bg-pink-50 hover:text-pink-600"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-0 rounded-md border border-pink-200 pt-0">
            {/* Item 1 */}
            <Label
              htmlFor="wedding-cakes"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="wedding-cakes"
                className="  border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([
                      ...selectedCategories,
                      "Wedding Cakes",
                    ])
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (cat) => cat !== "Wedding Cakes"
                      )
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Wedding Cakes
              </span>
            </Label>
            <hr className="w-full border-pink-200" />

            {/* Item 2 */}
            <Label
              htmlFor="anniversary-cakes"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="anniversary-cakes"
                className="border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([
                      ...selectedCategories,
                      "Anniversary Cakes",
                    ])
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (cat) => cat !== "Anniversary Cakes"
                      )
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Anniversary Cakes
              </span>
            </Label>
            <hr className="w-full border-pink-200" />

            {/* Item 3 */}
            <Label
              htmlFor="celebration-cakes"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="celebration-cakes"
                className="border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([
                      ...selectedCategories,
                      "Celebration Cakes",
                    ])
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (cat) => cat !== "Celebration Cakes"
                      )
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Celebration Cakes
              </span>
            </Label>
            <hr className="w-full border-pink-200" />

            {/* Item 4 */}
            <Label
              htmlFor="deserts"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="deserts"
                className="border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, "Deserts"])
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((cat) => cat !== "Deserts")
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Deserts
              </span>
            </Label>
          </CollapsibleContent>
        </Collapsible>

        {/* STATUS FILTER */}
        <Collapsible
          open={isStatusOpen}
          onOpenChange={setIsStatusOpen}
          className="flex w-full flex-col gap-2 "
        >
          {/* Header */}
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between px-2">
              <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
                Status
              </h4>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-slate-400 hover:bg-pink-50 hover:text-pink-600"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-0 rounded-md border border-pink-200 pt-0">
            {/* Item 1 */}
            <Label
              htmlFor="active"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="active"
                className="border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStatus([...selectedStatus, "Active"])
                  } else {
                    setSelectedStatus(
                      selectedStatus.filter((status) => status !== "Active")
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Active
              </span>
            </Label>
            <hr className="w-full border-pink-200" />

            {/* Item 2 */}
            <Label
              htmlFor="inactive"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
            >
              <Checkbox
                id="inactive"
                className="border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStatus([...selectedStatus, "Inactive"])
                  } else {
                    setSelectedStatus(
                      selectedStatus.filter((status) => status !== "Inactive")
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Inactive
              </span>
            </Label>
            <hr className="w-full border-pink-200" />

            {/* Item 3 */}
            <Label
              htmlFor="draft"
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50 "
            >
              <Checkbox
                id="draft"
                className="border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStatus([...selectedStatus, "Draft"])
                  } else {
                    setSelectedStatus(
                      selectedStatus.filter((status) => status !== "Draft")
                    )
                  }
                }}
              />
              <span className="text-sm text-slate-600 group-hover:text-pink-700">
                Draft
              </span>
            </Label>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="ml-2 w-full">
        {/* FILTER */}
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

        {/* TABLE */}
        <div className="rounded-lg border border-pink-200">
          <Table>
            <TableHeader className="sticky top-16 z-10 bg-white shadow-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="first:rounded-tl-lg last:rounded-tr-lg"
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

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
