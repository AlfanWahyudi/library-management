
'use client'

import { TableRow } from "@/components/ui/table";
import TableCellBasic from "../cell-table";

export default function EmptyTable({ table }) {
  return (
    <TableRow>
      <TableCellBasic colSpan={table.options.columns.length}>
        No results.
      </TableCellBasic>
    </TableRow>
  )
}