import BookDetailBreadcrumb from "@/components/specific/books/detail/breadcrumb"
import BookForm from "@/components/specific/books/form"
import ContentHead from "@/components/specific/content-head"
import AuthorService from "@/lib/services/author-service"
import BookService from "@/lib/services/book-service"

export default async function BookDetailPage({ params }) {
  const { id } = await params
  const book = await BookService.findById({ id: parseInt(id) })
  const authors = await AuthorService.getAll({})

  return (
    <>
      <h1 className="sr-only">Halaman Detail Buku</h1>
      <BookDetailBreadcrumb />
      <ContentHead pageTitle='Detail Buku'></ContentHead>
      <BookForm 
        book={book} 
        authorItems={authors.map((author) => ({ val: author.id, label: author.fullName }))} 
        viewOnly={true} 
      />
    </>
  )
}