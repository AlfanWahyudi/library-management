'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ChartBarCustom } from "./chart-bar-custom"
// TODO
export default function CardTopLoanedBook({
  chartConfig, 
  chartData, 
  chartXKey,
  chartYKey,
  chartBarKey,
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
        <ChartBarCustom 
          config={chartConfig} 
          data={chartData}
          xkey={chartXKey}
          ykey={chartYKey}
          barKey={chartBarKey}
        />
      </CardContent>
    </Card>
  )
}