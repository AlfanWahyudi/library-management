'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const breadcrumbItems = [
  {...routeConst.dashboard},
  {...routeConst.loanViolations}
]

export default function LoanViolationBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}