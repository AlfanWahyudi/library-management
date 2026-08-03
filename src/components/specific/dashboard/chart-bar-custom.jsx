"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

//TODO 
export function ChartBarCustom({ config, data, barKey, xkey, ykey = '' }) {
  return (
    <ChartContainer config={config}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey={ykey}
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) =>
          //   chartConfig[value as keyof typeof chartConfig]?.label
          // }
        />
        <XAxis dataKey={xkey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey={barKey} radius={5} />
      </BarChart>
    </ChartContainer>
  )
}
