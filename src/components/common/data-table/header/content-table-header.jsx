'use client'

import { TableHead, TableRow } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table";


export default function ContentTableHeader({ table }) {
  return (
    <>
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
    </>
  )
}