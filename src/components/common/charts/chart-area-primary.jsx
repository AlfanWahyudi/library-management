"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const DefaultLinearGrad = ({id, stopColor}) => {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop
        offset="5%"
        stopColor={stopColor}
        stopOpacity={0.8}
      />
      <stop
        offset="95%"
        stopColor={stopColor}
        stopOpacity={0.1}
      />
    </linearGradient>
  )
}


export default function chartAreaPrimary({ 
  chartData, 
  className = ' ',
}) {
  const { config, data } = chartData

  const configKeys = Object.keys(config)
  const [xAxisKey, ...yAxisKeys] = configKeys

  const linearGradData = yAxisKeys.map((key) => ({ id: `fill_${key}`, stopColor: `var(--color-${key})` }))
  const areaData = yAxisKeys.map((key) => ({ dataKey: key, fill: `url(#fill_${key})`, stroke: `var(--color-${key})` }))

  const classes = `aspect-auto min-h-[250px] w-full ${className}`

  const animate = (
    <defs>
      {linearGradData.map(data => (<DefaultLinearGrad key={data.id} {...data} />))}
    </defs>
  )

  return (
    <ChartContainer
      config={config}
      className={classes}
    >
      <AreaChart data={data}>
        {animate}
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="min-w-[12rem]"
            />
          }
        />
        {
          areaData.map((data) => (
            <Area
              key={data.dataKey}
              dataKey={data.dataKey}
              fill={data.fill}
              stroke={data.stroke}
              type="natural"
            />
          ))
        }
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}