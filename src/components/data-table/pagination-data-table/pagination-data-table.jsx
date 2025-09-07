"use client"

import RowOptionDataTable from "./row-option-data-table"
import NavigatePageContent from "./navigate-page-content"
import PaginateLabel from "./paginate-label"

export default function PaginationDataTable({
  table,
  rowPerPageOptions = [10, 25, 50, 100],
}) {
  const { pageIndex, pageSize } = table.getState().pagination
  const currRowsCount = table.getRowModel().rows.length

  const currFirstRow = pageIndex * pageSize + 1
  const currLastRow = (currFirstRow + currRowsCount) - 1

  return (
    <article className="flex flex-wrap gap-5 justify-center text-sm lg:justify-between px-3 py-2">
      <RowOptionDataTable table={table} rowPerPageOptions={rowPerPageOptions} />
      <section className="flex items-center gap-5">
        <PaginateLabel currFirstRow={currFirstRow} currLastRow={currLastRow} totalData={table.getRowCount()} />
        <NavigatePageContent table={table} />
      </section>
    </article>
  )
}