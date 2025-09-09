'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const breadcrumbItems = [
  {...routeConst.dashboard},
  {...routeConst.bookLoans}
]

export default function BookLoanBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}