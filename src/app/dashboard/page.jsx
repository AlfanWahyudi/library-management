import ContentHead from "@/components/specific/content-head"
import DashboardBreadcrumb from "@/components/specific/dashboard/breadcrumb"
import CardLoanYearAllDash from "@/components/specific/dashboard/card-loan-year-all-dash"
import CardTopTenLoanedBook from "@/components/specific/dashboard/card-top-ten-loaned-book"
import CardTopTenMemberLoan from "@/components/specific/dashboard/card-top-ten-member-loan"
import CardTotalDash from "@/components/specific/dashboard/card-total-dash"
import Auth from "@/lib/auth/auth"
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm"
import BookPerm from "@/lib/auth/permission/book-perm"
import MemberPerm from "@/lib/auth/permission/member-perm"
import BookLoanService from "@/lib/services/book-loan-service"
import BookService from "@/lib/services/book-service"
import MemberService from "@/lib/services/member-service"

const validatePerm = async (session) => {
  const bookPerm = new BookPerm(session)
  const blPerm = new BookLoanPerm(session)
  const memberPerm = new MemberPerm(session)

  return {
    canViewTotalBook: await bookPerm.canViewTotalBook(),
    canViewTotalBl: await blPerm.canViewTotal(),
    canViewTotalMem: await memberPerm.canViewTotal(),
    canViewLoanYearAll: await blPerm.canViewTotalYearAll(),
    canViewTopTenMemLoan: await memberPerm.canViewTopTenLoanBook(),
    canViewTopTenLoanedBook: await bookPerm.canViewTopTenLoanedBook() ,
  }

}

const fetchDataWithPerm = async ({
  canViewTotalBook,
  canViewTotalBl,
  canViewTotalMem,
  canViewLoanYearAll,
  canViewTopTenMemLoan,
  canViewTopTenLoanedBook,
}) => {
  let totalBook = null
  let totalBookLoan = null
  let totalMember = null
  let bookLoanTotalCompAll = null
  let memberTopTenLoan = null
  let bookTopTenLoaned = null

  if (canViewTotalBook) {
    totalBook = await BookService.calcTotal()
  }

  if (canViewTotalBl) {
    totalBookLoan = await BookLoanService.calcTotal()
  }

  if (canViewTotalMem) {
    totalMember = await MemberService.calcTotal()
  }

  if (canViewLoanYearAll) {
    bookLoanTotalCompAll = await BookLoanService.getTotalCompleteYearAll()
  }

  if (canViewTopTenMemLoan) {
    memberTopTenLoan = await MemberService.getTopTenLoan()
  }

  if (canViewTopTenLoanedBook) {
    bookTopTenLoaned = await BookService.getTopTenLoaned()
  }

  return {
    totalBook,
    totalBookLoan,
    totalMember,
    bookLoanTotalCompAll,
    memberTopTenLoan,
    bookTopTenLoaned,
  }
}

export default async function DashboardPage({}) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const permission = await validatePerm(session)

  const {
    totalBook,
    totalBookLoan,
    totalMember,
    bookLoanTotalCompAll,
    memberTopTenLoan,
    bookTopTenLoaned,
  } = await fetchDataWithPerm(permission)

  const setMaxWidthCardTotalDash = permission.canViewLoanYearAll ? 'lg:max-w-[17rem]' : ''

  return (
    <section>
      <h1 className="sr-only">Dashboard Page</h1>
      <DashboardBreadcrumb />
      <ContentHead pageTitle='Dashboard' />
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row">
          <CardTotalDash 
            canViewTotalBook={permission.canViewTotalBook}
            canViewTotalMember={permission.canViewTotalMem}
            canViewTotalBookLoan={permission.canViewTotalBl}
            totalBookLoan={totalBookLoan}
            totalMember={totalMember}
            totalBook={totalBook}
            className={`flex-1 ${setMaxWidthCardTotalDash}`}
          />
          {permission.canViewLoanYearAll && (
            <CardLoanYearAllDash 
              bookLoanTotalCompAll={bookLoanTotalCompAll}
              className="flex-1" 
            />)
          }
        </div>
        <div className="flex flex-col gap-5 lg:flex-row">
          {permission.canViewTopTenMemLoan && (
            <CardTopTenMemberLoan
              memberTopTenLoan={memberTopTenLoan}
              className="flex-1"
            />
          )}
          {permission.canViewTopTenLoanedBook && (
            <CardTopTenLoanedBook 
              bookTopTenLoaned={bookTopTenLoaned}
              className="flex-1"
            />
          )}
        </div>
      </section>
    </section>
  )
}