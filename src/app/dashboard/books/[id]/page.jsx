import BookDetailBreadcrumb from "@/components/specific/books/detail/breadcrumb"
import ContentHead from "@/components/specific/content-head"
import BookService from "@/lib/services/book-service"
import BookDetailDeletBtn from "@/components/specific/books/detail/delete-btn"
import CardBookInfo from "@/components/specific/books/detail/card-info";
import CardBookLoanHist from "@/components/specific/books/detail/card-loan-hist";

export default async function BookDetailPage({ params }) {
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
        <CardBookLoanHist bookId={book.id} />
      </section>
    </>
  )
}