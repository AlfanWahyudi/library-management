'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const breadcrumbItems = [
  {...ROUTE.DASHBOARD},
  {...ROUTE.BOOKS}
]

export default function BookBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}