'use client'

import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import InfoItem from "@/components/common/info-item";
import { Card, CardContent, CardFooter} from "@/components/ui/card";
import BookLoanCompleteAlertDialogForm from "./alert-dialog-form";

export default function CardCompleteBookLoan({ bookLoan, form, onSuccSubmit }) {
  const {startDate, endDate} = bookLoan

  return (
    <Card>  
      <CardContent className="grid gap-3 2xl:grid-cols-2">
        <InfoItem title="Tanggal Pinjam">
          {format(new Date(startDate), DATE_PATTERN.INDO_PRIMARY)}
        </InfoItem>
        <InfoItem title="Tanggal Wajib Kembali">
          {format(new Date(endDate), DATE_PATTERN.INDO_PRIMARY)}
        </InfoItem>
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <BookLoanCompleteAlertDialogForm
          bookLoan={bookLoan} 
          form={form}
          onSuccSubmit={onSuccSubmit}
        />
      </CardFooter>
    </Card>
  )
}