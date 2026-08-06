'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartBarTopTen from "../../common/charts/chart-bar-top-ten"
import { memberTopTenLoanChart } from "@/lib/charts/member-chart"

export default function CardTopTenMemberLoan({
  memberTopTenLoan,
  className, 
  size = "default" 
}) {
  const classes = ` ${className}`

  const chartData = memberTopTenLoanChart(memberTopTenLoan)

  return (
    <Card className={classes} size={size}>
      <CardHeader>
        <div>
          <CardTitle>Sepuluh anggota yang paling banyak meminjam buku</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartBarTopTen 
          chartData={chartData}
        />
      </CardContent>
    </Card>
  )
}