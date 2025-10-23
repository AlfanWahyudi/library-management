'use client'

import PendingTable from "./pending-table";
import ContentTable from "./content-table";
import ErrorTable from "./error-table";
import EmptyTable from "./empty-table";

export default function ContentTableBody({ table, error = false, isPending = false }) {
  let bodyContent = null

  if (error) {
    bodyContent = <ErrorTable table={table} />
  } else if (isPending) {
    bodyContent = <PendingTable table={table} />
  } else {
    if (table.getRowModel().rows?.length) {
      bodyContent = <ContentTable table={table} />
    } else {
      bodyContent = <EmptyTable table={table} />
    }
  }

  return bodyContent
}