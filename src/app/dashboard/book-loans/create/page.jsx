import BookLoanCreateBreadcrumb from "@/components/specific/book-loans/create/breadcrumb";
import BookLoanForm from "@/components/specific/book-loans/form";
import ContentHead from "@/components/specific/content-head";

//TODO
export default async function BookLoanCreatePage() {
  return (
    <>
      <h1 className="sr-only">Halaman Tambah Peminjaman Buku</h1>
      <BookLoanCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Peminjaman Buku'></ContentHead>
      <BookLoanForm />
    </>
  )
}