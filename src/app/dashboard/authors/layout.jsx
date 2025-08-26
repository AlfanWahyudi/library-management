import { Button } from "@/components/ui/button"
import DashHeader from "../components/dash-header"

const breadcrumbItems = [
  {
    path: '/dashboard',
    name: 'Home'
  },
  {
    name: 'Pengarang'
  }
]

const rightContentItem = (
  <>
    <Button variant='outline'>Download PDF</Button>
    <Button>Tambah pengarang</Button>
  </>
)

export default function AuthorLayout({ children }) {
  return (
    <>
      <h1 className="sr-only">Halaman Pengarang</h1>
      <DashHeader
        breadcrumbItems={breadcrumbItems} 
        pageTitle='Pengarang'
        rightContentItem={rightContentItem}
      />
      {children}
    </>
  )
}