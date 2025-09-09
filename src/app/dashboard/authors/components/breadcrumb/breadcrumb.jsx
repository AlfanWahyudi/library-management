'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const breadcrumbItems = [
  {...routeConst.dashboard},
  {...routeConst.authors}
]

export default function AuthorBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}