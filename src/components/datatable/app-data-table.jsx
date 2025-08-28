import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import RowOptionDataTable from "./row-option-data-table";
import PaginationDataTable from "./pagination-data-table";
import { Separator } from "../ui/separator";


//TODO: colspan untuk data kosong masih belum sesuai, columns count nya tidak sesuai
export default function AppDataTable({ table }) {
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
                <TableCell colSpan={table.getAllColumns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Separator className='mt-2' />
      <article className="flex flex-wrap gap-5 justify-center lg:justify-between py-3 px-2">
        <RowOptionDataTable />
        <PaginationDataTable />
      </article>
    </article>
  )
}
