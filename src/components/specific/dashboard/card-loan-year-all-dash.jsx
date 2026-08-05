"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartAreaPrimary from "../../common/charts/chart-area-primary"
import { bookLoanTotalChart } from "@/lib/charts/book-loan-chart"

// TODO: perbaiki bagian card header
export default function CardLoanYearAllDash({ 
  bookLoanTotalCompAll,
  className, 
  size = "default" 
}) {
  const classes = ` ${className}`

  const blTotalChartData = bookLoanTotalChart(bookLoanTotalCompAll)

  return (
    <Card className={classes} size={size}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Peminjaman</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartAreaPrimary chartData={blTotalChartData} />
      </CardContent>
    </Card>
  )
}