import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function SortIndicatorTable({ column, headerName }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {headerName}
      {
        column.getIsSorted()
          ? column.getIsSorted() === 'asc'
            ? <ArrowUp className="ml -2 h-4 w-4" />
            : <ArrowDown className="ml -2 h-4 w-4" />
          : undefined
      }
    </Button>
  )
}