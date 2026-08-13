import ForbiddenErrAlert from "@/components/common/error/forbidden-err-alert"
import BookForm from "@/components/specific/books/form"
import BookUpdateBreadcrumb from "@/components/specific/books/update/breadcrumb"
import ContentHead from "@/components/specific/content-head"
import Auth from "@/lib/auth/auth"
import BookPerm from "@/lib/auth/permission/book-perm"
import AuthorService from "@/lib/services/author-service"
import BookService from "@/lib/services/book-service"

export default async function BookUpdatePage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const bookPerm = await BookPerm.validation(session)
    .validateUpdate()
    .exec()

  if (!bookPerm.canUpdate) {
    return <ForbiddenErrAlert />
  }

  const { id } = await params
  const book = await BookService.findById({ id: parseInt(id) })
  const authors = await AuthorService.getAll({})

  return (
    <>
      <h1 className="sr-only">Halaman Update Buku</h1>
      <BookUpdateBreadcrumb />
      <ContentHead pageTitle='Update Buku'></ContentHead>
      <BookForm 
        book={book} 
        viewOnly={false} 
        authorItems={authors.map((author) => ({ val: author.id, label: author.fullName }))}
      />
    </>
  )
}