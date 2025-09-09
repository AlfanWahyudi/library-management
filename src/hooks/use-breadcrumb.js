'use client'

import { BreadcrumbContext } from "@/store/breadcrumb-context"
import { useContext, useEffect } from "react"

export function useSetBreadcrumb(initialRoutes) {
  const { updatedRoutes, setRoutesToBreadcrumb } = useContext(BreadcrumbContext)

  useEffect(() => {
    setRoutesToBreadcrumb(initialRoutes)
  }, [...initialRoutes])

  return {
    updatedRoutes,
  }
}