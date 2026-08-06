'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartBarTopTen from "../../common/charts/chart-bar-top-ten"
import { bookTopTenLoanedChart } from "@/lib/charts/book-chart"

export default function CardTopTenLoanedBook({
  bookTopTenLoaned,
  className,
  size = "default" 
}) {
  const classes = ` ${className}`

  const chartData = bookTopTenLoanedChart(bookTopTenLoaned)

  return (
    <Card className={classes} size={size}>
      <CardHeader>
        <div>
          <CardTitle>Sepuluh buku yang paling banyak dipinjam</CardTitle>
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