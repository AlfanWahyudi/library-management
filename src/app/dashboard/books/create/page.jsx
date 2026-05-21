import BookCreateBreadcrumb from "@/components/specific/books/create/breadcrumb";
import BookForm from "@/components/specific/books/form";
import ContentHead from "@/components/specific/content-head";
import AuthorService from "@/lib/services/author-service";

export default async function BookCreatePage() {
  const authors = await AuthorService.getAll({})

  return (
    <>
      <h1 className="sr-only">Halaman Tambah Buku</h1>
      <BookCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Buku'></ContentHead>
      <BookForm
        authorItems={authors.map((author) => ({ val: author.id, label: author.fullName }))}
      />
    </>
  )
}