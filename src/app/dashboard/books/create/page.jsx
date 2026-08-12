import BookCreateBreadcrumb from "@/components/specific/books/create/breadcrumb";
import BookForm from "@/components/specific/books/form";
import ContentHead from "@/components/specific/content-head";
import Auth from "@/lib/auth/auth";
import BookPerm from "@/lib/auth/permission/book-perm";
import AuthorService from "@/lib/services/author-service";

export default async function BookCreatePage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const bookPerm = await BookPerm.validation(session)
    .validateCreate()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!bookPerm.canCreate) {
    return "You don't have permission to access this page."
  }

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