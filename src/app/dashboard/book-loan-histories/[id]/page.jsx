import TitlePage from "@/components/common/title-page"
import BookLoanHistDetailBreadcrumb from "@/components/specific/book-loan-histories/detail/breadcrumb"
import CardDetailBookLoan from "@/components/specific/book-loans/card-detail-book-loan"
import BookLoanService from "@/lib/services/book-loan-service"
import CardComplHistBookLoan from "@/components/specific/book-loans/card-complete-book-loan"
import Auth from "@/lib/auth/auth"
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm"

export default async function BookLoanHistDetailPage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()
  const blPerm = await BookLoanPerm.validation(session)
    .validateViewHistory()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!blPerm.canViewHistory) {
    return "You don't have permission to access this page."
  }

  const { id } = await params

  const bookLoan = await BookLoanService.findCompleteLoanById(parseInt(id))
  const {book, member, finishedDate, startDate, endDate} = bookLoan

  return(
    <>
      <h1 className="sr-only">Halaman Detail Pemin baalndlakfjalksdjf</h1>
      <BookLoanHistDetailBreadcrumb />
      <section className="flex flex-col">
        <TitlePage>Detail Riwayat Peminjaman Buku</TitlePage>
        <section className="grow flex flex-col gap-7 md:flex-row">
          <section className="grow">
            <CardDetailBookLoan book={book} member={member} />
          </section>
          <section className="grow md:max-w-1/5">
            <CardComplHistBookLoan finishedDate={finishedDate} startDate={startDate} endDate={endDate} />
          </section>
        </section>
      </section>
    </>
  )
}