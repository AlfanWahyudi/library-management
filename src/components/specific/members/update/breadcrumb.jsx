'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const breadcrumbItems = [
  {...ROUTE.DASHBOARD},
  {...ROUTE.MEMBERS},
  {...ROUTE.MEMBERS_UPDATE}
]

export default function MemberUpdateBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}