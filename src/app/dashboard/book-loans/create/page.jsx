import ForbiddenErrAlert from "@/components/common/error/forbidden-err-alert";
import BookLoanCreateBreadcrumb from "@/components/specific/book-loans/create/breadcrumb";
import BookLoanForm from "@/components/specific/book-loans/form";
import ContentHead from "@/components/specific/content-head";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";

export default async function BookLoanCreatePage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const blPerm = await BookLoanPerm.validation(session)
    .validateCreate()
    .exec()

  if (!blPerm.canCreate) {
    return <ForbiddenErrAlert />
  }

  return (
    <>
      <h1 className="sr-only">Halaman Tambah Peminjaman Buku</h1>
      <BookLoanCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Peminjaman Buku'></ContentHead>
      <BookLoanForm />
    </>
  )
}