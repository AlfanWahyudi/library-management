'use client'

import ContentHead from "@/components/dashboard/content-head"
import { Button } from "@/components/ui/button"
import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"

const rightContentItem = (
  <>
    <Button variant='outline'>Contoh Btn 1</Button>
    <Button>Contoh Btn 2</Button>
  </>
)

const breadcrumbItems = [
  {...ROUTE.DASHBOARD}
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