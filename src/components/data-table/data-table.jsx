"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import RowOptionDataTable from "./pagination-data-table/row-option-data-table";
import PaginationDataTable from "./pagination-data-table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";


//TODO: rapihkan codingannya
export default function DataTable({ table }) {
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
          {table.getRowModel().rows?.length 
            ? (
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
            ) : (
              <TableRow>
                <TableCell colSpan={table.options.columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Separator className='mt-2' />
      <PaginationDataTable table={table} />
    </article>
  )
}
