"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// TODO
export default function ChartLoanDash({ config, data, className = ' ' }) {
  const classes = `aspect-auto h-[250px] w-full ${className}`

  return (
    <ChartContainer
      config={config}
      className={classes}
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillLoan" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-loan)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-loan)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMember" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-member)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-member)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillBook" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-book)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-book)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          // tickMargin={8}
          // minTickGap={32}
          // tickFormatter={(value) => {
          //   const date = new Date(value)
          //   return date.toLocaleDateString("en-US", {
          //     month: "short",
          //     day: "numeric",
          //   })
          // }}
        />
        {/* <YAxis with="auto" /> */}
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              // labelFormatter={(value) => {
              //   return new Date(value).toLocaleDateString("en-US", {
              //     month: "short",
              //     day: "numeric",
              //   })
              // }}
              // indicator="dot"
            />
          }
        />
        <Area
          dataKey="loan"
          type="natural"
          fill="url(#fillLoan)"
          stroke="var(--color-loan)"
          stackId="a"
        />

        <Area
          dataKey="member"
          type="natural"
          fill="url(#fillMember)"
          stroke="var(--color-member)"
          stackId="a"
        />

        <Area
          dataKey="book"
          type="natural"
          fill="url(#fillBook)"
          stroke="var(--color-book)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}