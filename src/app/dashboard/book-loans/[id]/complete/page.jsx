import ForbiddenErrAlert from "@/components/common/error/forbidden-err-alert";
import BookLoanCompleteBreadcrumb from "@/components/specific/book-loans/complete/breadcrumb";
import BookLoanCompleteForm from "@/components/specific/book-loans/complete/form";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";
import BookLoanService from "@/lib/services/book-loan-service";

export default async function BookLoanCompletePage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const blPerm = await BookLoanPerm.validation(session)
    .validateCompleteLoan()
    .exec()

  if (!blPerm.canCompleteLoan) {
    return <ForbiddenErrAlert />
  }

  const { id } = await params

  const bookLoan = await BookLoanService.findStillLoanById(parseInt(id))

  return(
    <>
      <h1 className="sr-only">Halaman Pengembalian Buku Pinjaman</h1>
      <BookLoanCompleteBreadcrumb />
      <BookLoanCompleteForm bookLoan={bookLoan} />
    </>
  )
}