'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectRowOption({ table, rowPerPageOptions, }) {
  const { pageSize } = table.getState().pagination

  return (
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
  )
}