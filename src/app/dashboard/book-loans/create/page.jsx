import BookLoanCreateBreadcrumb from "@/components/specific/book-loans/create/breadcrumb";
import BookLoanForm from "@/components/specific/book-loans/form";
import ContentHead from "@/components/specific/content-head";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";

//TODO
export default async function BookLoanCreatePage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const blPerm = await BookLoanPerm.validation(session)
    .validateCreate()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!blPerm.canCreate) {
    return "You don't have permission to access this page."
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