"use client"

import { Card, CardContent } from "@/components/ui/card"
import ItemTotalDash from "./item-total-dash"


export default function CardTotalDash({ className, size = "default", items  }) {
  const classes = ` ${className}`

  return (
    <Card className={classes} size={size}>
      <CardContent className="flex gap-6 flex-wrap">
        { items.map((item, idx) => (<ItemTotalDash key={idx} {...item} />)) }
      </CardContent>
    </Card>
  )
}