import BookDetailBreadcrumb from "@/components/specific/books/detail/breadcrumb"
import ContentHead from "@/components/specific/content-head"
import BookService from "@/lib/services/book-service"
import BookDetailDelBtn from "@/components/specific/books/detail/del-btn"
import CardBookInfo from "@/components/specific/books/detail/card-info";
import CardBookLoanHist from "@/components/specific/books/detail/card-loan-hist";
import Auth from "@/lib/auth/auth";
import BookPerm from "@/lib/auth/permission/book-perm";
import ForbiddenErrAlert from "@/components/common/error/forbidden-err-alert";

const getDelBtn = async ({ bookPerm, bookId }) => {
  let delBtn = undefined

  if (bookPerm.canDelete && bookPerm.verifyDataCanDeleted) {
    const canDataDeleted = await BookService.canDataDeleted({ id: bookId })
    delBtn = (<BookDetailDelBtn canDataDeleted={canDataDeleted} bookId={bookId} />)
  }

  return delBtn
}

export default async function BookDetailPage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const bookPerm = await BookPerm.validation(session)
    .validateView()
    .validateViewListInclLoan()
    .validateDelete()
    .validateDataCanDeleted()
    .exec()

  if (!bookPerm.canView) {
    return <ForbiddenErrAlert />
  }

  const { id } = await params
  const book = await BookService.findById({ id: parseInt(id) })
  const delBtn = await getDelBtn({ bookPerm, bookId: book.id })

  return (
    <>
      <h1 className="sr-only">Halaman Detail Buku</h1>
      <BookDetailBreadcrumb />
      <ContentHead pageTitle='Detail Buku'>
        {delBtn}
      </ContentHead>
      <section className="flex flex-col gap-6">
        <CardBookInfo book={book} />
        {bookPerm.canViewListInclLoan && (<CardBookLoanHist bookId={book.id} />)}
      </section>
    </>
  )
}