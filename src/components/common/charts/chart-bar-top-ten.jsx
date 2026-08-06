"use client"

import { Bar, BarChart, CartesianGrid, Label, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const CustomLabel = (props) => {
  const fill = colors[(props.index ?? 0) % colors.length];
  return <Label {...props} fill={fill} />;
};

//TODO 
export default function ChartBarTopTen({   
  chartData, 
  className = ' ',
}) {
  const { config, data } = chartData

  if (data.length > 10) {
    throw Error('length of data must not be more than 10')
  }

  const dataMapped = data.map((item, idx) => ({
    ...item,
    no: `${idx + 1}.`
  }))

  const firstData = dataMapped[0]
  const dataKeys = Object.keys(firstData)
  const [yAxisKey, xAxisKey, noKey] = dataKeys

  const classes = `aspect-auto h-[23rem] w-full ${className}` //TODO: ganti default styling nya

  return (
    <ChartContainer config={config} className={classes}>
      <BarChart
        accessibilityLayer
        data={dataMapped}
        layout="vertical"
        margin={{
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey={yAxisKey}
          type="category"
          label={false}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <XAxis dataKey={xAxisKey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent 
              indicator="line"
              className="min-w-[11rem]"
            />
          }
        />
        <Bar dataKey={xAxisKey} fill={`var(--color-${xAxisKey})`} radius={5}>
          <LabelList
            dataKey={noKey}
            position="left"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
          <LabelList
            dataKey={yAxisKey}
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey={xAxisKey}
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
