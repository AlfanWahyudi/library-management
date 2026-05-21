"use client"

import { Table, TableBody, TableHeader } from "@/components/ui/table";
import PaginationDataTable from "./pagination/pagination-data-table";
import { Separator } from "../../ui/separator";
import ContentTableBody from "./body/content-table-body";
import ContentTableHeader from "./header/content-table-header";

export default function DataTableMain({ table, isPending = false, error = false }) {
  return (
    <article className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <ContentTableHeader table={table} />
        </TableHeader>
        <TableBody>
          <ContentTableBody table={table} error={error} isPending={isPending} />
        </TableBody>
      </Table>
      <Separator className='mt-2' />
      <PaginationDataTable table={table} />
    </article>
  )
}
