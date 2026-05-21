
'use client'

import { TableRow } from "@/components/ui/table";
import TableCellBasic from "../cell-table";

export default function ErrorTable({ table }) {
  return (
    <TableRow>
      <TableCellBasic colSpan={table.options.columns.length} className='text-destructive'>
        Gagal menampilkan data yang Anda cari, mohon untuk mencoba lagi nanti.
      </TableCellBasic>
    </TableRow>
  )
}