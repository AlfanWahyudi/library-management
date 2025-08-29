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
  pageSizeItems = [10, 25, 50, 100],
  className,
  ...props
}) {
  const cssClasses = 'flex text-sm items-center gap-3 ' + className 

  const { pageIndex, pageSize } = table.getState().pagination
  const currRowsCount = table.getRowModel().rows.length

  const currFirstRow = pageIndex * pageSize + 1
  const currLastRow = (currFirstRow + currRowsCount) - 1

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
            {pageSizeItems.map((pageSize => (
              <SelectItem key={pageSize} value={pageSize}>{pageSize}</SelectItem>
            )))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p>{currFirstRow}-{currLastRow} of {table.getRowCount()}</p>
    </section>
  )
}