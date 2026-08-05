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

// TODO: card header
export default function CardTopTenMemberLoan({
  memberTopTenLoan,
  className, 
  size = "default" 
}) {
  const classes = ` ${className}`

  const chartData = memberTopTenLoanChart(memberTopTenLoan)

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
        <ChartBarTopTen 
          chartData={chartData}
        />
      </CardContent>
    </Card>
  )
}