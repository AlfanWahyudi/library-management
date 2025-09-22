'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const breadcrumbItems = [
  {...routeConst.dashboard},
  {...routeConst.members}
]

export default function MemberBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}