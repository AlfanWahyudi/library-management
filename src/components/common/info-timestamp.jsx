'use client'

import InfoItem from "@/components/common/info-item"
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern"
import { format } from "date-fns"

export default function InfoTimestamp({ createdAt, updatedAt, className }) {
  const classes = `grid grid-cols-2 gap-3 ${className}`
  return (
    <section className={classes}>
      <InfoItem title="Tanggal Dibuat">
        <p>{format(new Date(createdAt), DATETIME_PATTERN.INDO_PRIMARY)}</p>
      </InfoItem>
      <InfoItem title="Tanggal Diperbarui">
        <p>{format(new Date(updatedAt), DATETIME_PATTERN.INDO_PRIMARY)}</p>
      </InfoItem>
    </section>
  )
}