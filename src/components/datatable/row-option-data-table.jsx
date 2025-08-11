import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RowOptionDataTable({
  className
}) {
  const cssClasses = 'flex text-sm items-center gap-3 ' + className 

  return (
    <section className={cssClasses}>
      <p>Rows per page</p>
      <Select>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p>1-10 of 20</p>
    </section>
  )
}