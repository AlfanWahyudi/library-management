'use client'

export default function PaginateLabel({ currFirstRow, currLastRow, totalData, ...props }) {
  return <p {...props}>{currFirstRow}-{currLastRow} of {totalData}</p>
}