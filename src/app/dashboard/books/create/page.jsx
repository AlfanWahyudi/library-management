import BookCreateBreadcrumb from "@/components/specific/books/create/breadcrumb";
import ContentHead from "@/components/specific/content-head";

//TODO
export default function BookCreatePage() {
  return (
    <>
      <h1 className="sr-only">Halaman Tambah Buku</h1>
      <BookCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Buku'></ContentHead>
      {/* <MemberForm /> */}
    </>
  )
}