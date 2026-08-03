"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartLoanDash from "./chart-loan-dash"

// TODO
export default function CardLoanYearAllDash({ 
  chartConfig, 
  chartData, 
  className, 
  size = "default" 
}) {
  const classes = ` ${className}`

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
        <ChartLoanDash config={chartConfig} data={chartData} />
      </CardContent>
    </Card>
  )
}