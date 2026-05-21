"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LabelRowOption from "./label-row-option"
import SelectRowOption from "./select-row-option"

export default function RowOptionDataTable({
  table,
  rowPerPageOptions,
  className,
}) {
  const cssClasses = 'flex items-center gap-3 ' + className 

  return (
    <section className={cssClasses}>
      <LabelRowOption />
      <SelectRowOption table={table} rowPerPageOptions={rowPerPageOptions} />
    </section>
  )
}