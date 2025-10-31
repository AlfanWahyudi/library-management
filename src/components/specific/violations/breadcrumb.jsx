'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const breadcrumbItems = [
  {...ROUTE.DASHBOARD},
  {...ROUTE.VIOLATIONS}
]

export default function ViolationSanctionBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}