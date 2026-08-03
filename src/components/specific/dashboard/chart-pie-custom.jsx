"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// TODO
export function ChartPieCustom({ config, data }) {
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px] px-0"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="total" hideLabel />}
        />
        <Pie
          data={data}
          dataKey="total"
          labelLine={false}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="var(--foreground)"
              >
                {payload.total}
              </text>
            )
          }}
          nameKey="name"
        />
      </PieChart>
    </ChartContainer>
  )
}
