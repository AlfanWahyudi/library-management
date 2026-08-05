"use client"

import { Card, CardContent } from "@/components/ui/card"
import ItemTotalDash from "./item-total-dash"
import { mapTotalInfoData } from "./total-info"


export default function CardTotalDash({  totalBook, totalBookLoan, totalMember,  className, size = "default", items  }) {
  const classes = ` ${className}`

  const data = mapTotalInfoData({ totalBook, totalBookLoan, totalMember })

  return (
    <Card className={classes} size={size}>
      <CardContent className="flex gap-6 flex-wrap">
        { data.map((item, idx) => (<ItemTotalDash key={idx} {...item} />)) }
      </CardContent>
    </Card>
  )
}