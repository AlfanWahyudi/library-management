'use client'

import { Button } from "@/components/ui/button"
import ContentHead from "./components/content-head"
import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import routeConst from "@/lib/constants/route-const"

const rightContentItem = (
  <>
    <Button variant='outline'>Contoh Btn 1</Button>
    <Button>Contoh Btn 2</Button>
  </>
)

const breadcrumbItems = [
  {...routeConst.dashboard}
]

export default function DashboardPage() {
  const { updatedRoutes } = useSetBreadcrumb(breadcrumbItems)

  return (
    <>
      <h1 className="sr-only">Dashboard Page</h1>
      <ContentHead 
        pageTitle='Dashboard'
        rightContentItem={rightContentItem}
      />
    </>
  )
}