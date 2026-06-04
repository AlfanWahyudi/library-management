'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MemberLoanHistDataTable from "./loan-hist/data-table";

export default function CardMemberLoanHist({ memberId }) {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Riwayat Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <MemberLoanHistDataTable memberId={memberId} />
      </CardContent>
    </Card>
  )
}