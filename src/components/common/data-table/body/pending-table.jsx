'use client'

import { TableRow } from "@/components/ui/table";
import { Loader2Icon } from "lucide-react";
import TableCellBasic from "../cell-table";

export default function PendingTable({ table }) {
  return (
    <TableRow>
      <TableCellBasic colSpan={table.options.columns.length}>
        <p className="inline-flex gap-1 items-center justify-center">
          <Loader2Icon className="animate-spin" /> Please wait...
        </p>
      </TableCellBasic>
    </TableRow>
  )
}