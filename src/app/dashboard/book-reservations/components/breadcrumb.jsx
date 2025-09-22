'use client'

import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const breadcrumbItems = [
  {...routeConst.dashboard},
  {...routeConst.bookReservations}
]

export default function BookReservationBreadcrumb() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return null
}