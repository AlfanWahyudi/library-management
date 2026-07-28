'use client'

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { formatNumber } from "@/lib/utils/number"

export default function ItemTotalDash({ total, name, icon, ...props }) {
  const totalModified = formatNumber(total)

  return (
    <Item variant="outline" className="w-full md:max-w-[225px] lg:max-w-3xs" {...props}>
      <ItemMedia variant="icon">
        {icon}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-xl font-semibold">{totalModified}</ItemTitle>
        <ItemDescription>{name}</ItemDescription>
      </ItemContent>
    </Item>
  )

}