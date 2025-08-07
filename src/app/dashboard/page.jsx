import { Button } from "@/components/ui/button";
import DashHeader from "./components/dash-header";

const breadcrumbItems = [
  {
    path: '/dashboard',
    name: 'Home'
  },
  {
    name: 'Dashboard'
  }
]

const rightContentItem = (
  <>
    <Button variant='outline'>Contoh Btn 1</Button>
    <Button>Contoh Btn 2</Button>
  </>
)

export default function DashboardPage() {
  return (
    <>
      <h1 className="sr-only">Dashboard Page</h1>
      <DashHeader 
        breadcrumbItems={breadcrumbItems} 
        pageTitle='Dashboard'
        rightContentItem={rightContentItem}
      />
    </>
  )
}