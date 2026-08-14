'use client'

import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import InfoItem from "@/components/common/info-item";
import { Card, CardContent} from "@/components/ui/card";
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern";

export default function CardComplHistBookLoan({ startDate, endDate, finishedDate }) {
  return (
    <Card>  
      <CardContent className="grid gap-3">
        <InfoItem title="Tanggal Pinjam">
          {format(new Date(startDate), DATE_PATTERN.INDO_PRIMARY)}
        </InfoItem>
        <InfoItem title="Tanggal Terakhir Wajib Kembali">
          {format(new Date(endDate), DATE_PATTERN.INDO_PRIMARY)}
        </InfoItem>
        <InfoItem title="Tanggal Pengembalian">
          {format(new Date(finishedDate), DATETIME_PATTERN.INDO_PRIMARY)}
        </InfoItem>
      </CardContent>
    </Card>
  )
}