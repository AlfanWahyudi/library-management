import ContentHead from "@/components/specific/content-head"
import CardLoanYearAllDash from "@/components/specific/dashboard/card-loan-year-all-dash"
import CardTopTenLoanedBook from "@/components/specific/dashboard/card-top-ten-loaned-book"
import CardTopTenMemberLoan from "@/components/specific/dashboard/card-top-ten-member-loan"
import CardTotalDash from "@/components/specific/dashboard/card-total-dash"
import { Button } from "@/components/ui/button"
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

export default async function DashboardPage({}) {
  const totalBookLoan = await BookLoanService.calcTotal()
  const totalMember = await MemberService.calcTotal()
  const totalBook = await BookService.calcTotal()

  const bookLoanTotalCompAll = await BookLoanService.getTotalCompleteYearAll()
  const memberTopTenLoan = await MemberService.getTopTenLoan()
  const bookTopTenLoaned = await BookService.getTopTenLoaned()

  return (
    <>
      <h1 className="sr-only">Dashboard Page</h1>
      <ContentHead 
        pageTitle='Dashboard'
        rightContentItem={rightContentItem}
        />
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row">
          <CardTotalDash 
            totalBookLoan={totalBookLoan}
            totalMember={totalMember}
            totalBook={totalBook}
            className="flex-1 lg:max-w-[17rem]"
          />
          <CardLoanYearAllDash 
            bookLoanTotalCompAll={bookLoanTotalCompAll}
            className="flex-1" 
          />
        </div>
        <div className="flex flex-col gap-5 lg:flex-row">
          <CardTopTenMemberLoan
            memberTopTenLoan={memberTopTenLoan}
            className="flex-1"
          />
          <CardTopTenLoanedBook 
            bookTopTenLoaned={bookTopTenLoaned}
            className="flex-1"
          />
        </div>
      </section>
    </>
  )
}