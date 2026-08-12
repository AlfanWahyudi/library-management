"use client"

import { Card, CardContent } from "@/components/ui/card"
import ItemTotalDash from "./item-total-dash"
import { mapTotalInfoData } from "./total-info"

export default function CardTotalDash({ 
  canViewTotalBook,
  canViewTotalBookLoan,
  canViewTotalMember, 
  totalBook, 
  totalBookLoan, 
  totalMember, 
  className, 
  size = "default",
}) {
  const classes = ` ${className}`

  const data = mapTotalInfoData({ canViewTotalBook, canViewTotalBookLoan, canViewTotalMember, totalBook, totalBookLoan, totalMember })

  return (
    <Card className={classes} size={size}>
      <CardContent className="flex gap-y-4 gap-x-6  flex-wrap">
        {data.map((item, idx) => {
          if (item.visible) {
            return <ItemTotalDash key={idx} icon={item.icon} name={item.name} total={item.total} />
          }

          return undefined
        })}
      </CardContent>
    </Card>
  )
}