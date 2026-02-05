'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const breadcrumbItems = [
  {...ROUTE.DASHBOARD},
  {...ROUTE.BOOKS},
  {...ROUTE.BOOKS_CREATE}
]

export default function BookCreateBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}