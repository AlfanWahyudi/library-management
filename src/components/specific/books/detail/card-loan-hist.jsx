'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BookLoanHistSpeDataTable from "@/components/specific/books/detail/loan-hist/data-table";

export default function CardBookLoanHist({ bookId }) {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Riwayat Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <BookLoanHistSpeDataTable bookId={bookId} />
      </CardContent>
    </Card>
  )
}