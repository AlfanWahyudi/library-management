import BookDetailBreadcrumb from "@/components/specific/books/detail/breadcrumb"
import ContentHead from "@/components/specific/content-head"
import BookService from "@/lib/services/book-service"
import BookDetailDeletBtn from "@/components/specific/books/detail/delete-btn"
import CardBookInfo from "@/components/specific/books/detail/card-info";
import CardBookLoanHist from "@/components/specific/books/detail/card-loan-hist";
import Auth from "@/lib/auth/auth";
import BookPerm from "@/lib/auth/permission/book-perm";

export default async function BookDetailPage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const bookPerm = await BookPerm.validation(session)
    .validateView()
    .validateViewListInclLoan()
    .exec()

    // TODO: rapihkan tampilan pesan validasi nya
  if (!bookPerm.canView) {
    return "You don't have permission to access this page."
  }

  const { id } = await params
  const book = await BookService.findById({ id: parseInt(id) })
  const canDelete = await BookService.canDataDeleted({ id: book.id })

  return (
    <>
      <h1 className="sr-only">Halaman Detail Buku</h1>
      <BookDetailBreadcrumb />
      <ContentHead pageTitle='Detail Buku'>
        <BookDetailDeletBtn canDelete={canDelete} bookId={book.id} />
      </ContentHead>
      <section className="flex flex-col gap-6">
        <CardBookInfo book={book} />
        {bookPerm.canViewListInclLoan && (<CardBookLoanHist bookId={book.id} />)}
      </section>
    </>
  )
}