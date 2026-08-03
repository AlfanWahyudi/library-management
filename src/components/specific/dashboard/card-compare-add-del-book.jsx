'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartLoanDash from "./chart-loan-dash"
import { ChartPieCustom } from "./chart-pie-custom"
// TODO
export default function CardCompareAddDelBook({
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
          <CardTitle>Title</CardTitle>
          <CardDescription>
            ......
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartPieCustom config={chartConfig} data={chartData} />
      </CardContent>
    </Card>
  )
}