'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const breadcrumbItems = [
  {...ROUTE.DASHBOARD},
  {...ROUTE.BOOKS},
  {...ROUTE.BOOKS_UPDATE}
]

export default function BookUpdateBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}