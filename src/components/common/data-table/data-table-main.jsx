"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import PaginationDataTable from "./pagination/pagination-data-table";
import { Separator } from "../../ui/separator";
import { Loader2Icon } from "lucide-react";


//TODO: rapihkan codingannya
export default function DataTableMain({ table, isPending = false, error = false }) {
  let bodyContent = null
  if (error) {
    bodyContent = (
      <TableRow>
        <TableCell colSpan={table.options.columns.length} className='h-24 text-center text-destructive text-md'>
          Gagal menampilkan data yang Anda cari, mohon untuk mencoba lagi nanti.
        </TableCell>
      </TableRow>
    )
  } else if (isPending) {
    bodyContent = (
      <TableRow>
        <TableCell colSpan={table.options.columns.length} className='h-24 text-center text-md'>
          <p className="inline-flex gap-1 items-center justify-center">
            <Loader2Icon className="animate-spin" /> Please wait...
          </p>
        </TableCell>
      </TableRow>
    )
  } else {
    if (table.getRowModel().rows?.length) {
      bodyContent = (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )
    } else {
      bodyContent = (
        <TableRow>
          <TableCell colSpan={table.options.columns.length} className='h-24 text-center text-md'>
            No results.
          </TableCell>
        </TableRow>
      )
    }
  }

  return (
    <article className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {bodyContent}
        </TableBody>
      </Table>
      <Separator className='mt-2' />
      <PaginationDataTable table={table} />
    </article>
  )
}
