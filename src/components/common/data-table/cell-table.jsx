'use client'

import { TableCell } from "@/components/ui/table"

export default function CellTable({ colSpan, className, children  }) {
  const classes = `h-24 text-center text-md ${className}`

  return (
    <TableCell colSpan={colSpan} className={classes}>
      {children}
    </TableCell>
  )
}