"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//TODO: rapihkan codingan nya
export default function RowOptionDataTable({
  table,
  rowPerPageOptions,
  className,
}) {
  const cssClasses = 'flex items-center gap-3 ' + className 

  const { pageSize } = table.getState().pagination

  return (
    <section className={cssClasses}>
      <p>Rows per page</p>
      <Select
        onValueChange={value => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="w-[75px]">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {rowPerPageOptions.map((perPage => (
              <SelectItem key={perPage} value={perPage}>{perPage}</SelectItem>
            )))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}