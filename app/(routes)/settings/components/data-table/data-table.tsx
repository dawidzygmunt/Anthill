"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { AddActivityForm } from "../add-activity-form"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [switchValue, setSwitchValue] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const searchParams = useSearchParams()

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  React.useEffect(() => {
    if (searchParams.get("showDeleted") === "true") {
      setSwitchValue(true)
    } else {
      setSwitchValue(false)
    }
  }, [searchParams, switchValue])

  return (
    <div>
      <div className="flex justify-between pb-4">
        <div className="relative flex">
          <Search className="absolute h-4 w-4 text-gray-400 pointer-events-none top-3 left-3" />
          <Input
            placeholder="Search activities..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10 rounded-xl lg:min-w-80"
          />
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="inline-flex items-center bg-[#f8f2ec] rounded-lg p-1">
            <Link href="?showDeleted=false">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  !switchValue
                    ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-transparent"
                }`}
              >
                Active
              </Button>
            </Link>
            <Link href="?showDeleted=true">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  switchValue
                    ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-transparent"
                }`}
              >
                Archived
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
    </div>
  )
}
