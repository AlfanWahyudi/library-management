'use client'

import { Button } from "@/components/ui/button"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"

export default function NavigatePageContent({
  table,
}) {
  return (
    <section className="flex gap-3">
      <Button
        variant="ghost"
        size="icon" 
        className="size-8"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronFirst />
      </Button>
      <Button
        variant="ghost"
        size="icon" 
        className="size-8"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon" 
        className="size-8"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="ghost"
        size="icon" 
        className="size-8"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronLast />
      </Button>
    </section>
  )
}