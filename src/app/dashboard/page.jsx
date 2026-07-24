import ContentHead from "@/components/specific/content-head"
import { Button } from "@/components/ui/button"
import { useSetBreadcrumb } from "@/hooks/use-breadcrumb"
import { ROUTE } from "@/lib/constants/route"
import BookLoanService from "@/lib/services/book-loan-service"
import BookService from "@/lib/services/book-service"
import MemberService from "@/lib/services/member-service"

const rightContentItem = (
  <>
    <Button variant='outline'>Contoh Btn 1</Button>
    <Button>Contoh Btn 2</Button>
  </>
)

const breadcrumbItems = [
  {...ROUTE.DASHBOARD}
]


//-----------------------------------

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// }


// TODO: visualize chart data
export default async function DashboardPage({}) {
  const totalBookLoan = await BookLoanService.calcTotal()
  const chartCompleteYearAll = await BookLoanService.chartTotalCompleteAll()
  const chartCompleteYear = await BookLoanService.chartTotalCompleteYear(2026)
  const chartCompleteMonth = await BookLoanService.chartTotalCompleteMonth(2026, 4)

  console.log(totalBookLoan)
  console.log(chartCompleteYearAll)
  console.log(chartCompleteYear)
  console.log(chartCompleteMonth)

  console.log('----------------------')

  const totalMember = await MemberService.calcTotal()
  console.log(totalMember)

  console.log('----------------')

  const totalBook = await BookService.calcTotal()
  console.log(totalBook)

  console.log('----------------')

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