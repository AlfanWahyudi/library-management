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

export default function CardLoanYearAllDash({ 
  bookLoanTotalCompAll,
  className, 
  size = "default" 
}) {
  const classes = ` ${className}`

  const blTotalChartData = bookLoanTotalChart(bookLoanTotalCompAll)
  console.log(blTotalChartData)

  return (
    <Card className={classes} size={size}>
      <CardHeader>
        <div>
          <CardTitle>Data Peminjaman</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartAreaPrimary chartData={blTotalChartData} />
      </CardContent>
    </Card>
  )
}