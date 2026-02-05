import BookDetailBreadcrumb from "@/components/specific/books/detail/breadcrumb"
import ContentHead from "@/components/specific/content-head"

//TODO
export default async function BookDetailPage({ params }) {
  const { id } = await params
  // const member = await MemberService.findById({ id: parseInt(id) })

  return (
    <>
      <h1 className="sr-only">Halaman Detail Buku</h1>
      <BookDetailBreadcrumb />
      <ContentHead pageTitle='Detail Buku'></ContentHead>
      {/* <MemberForm member={member} viewOnly={true} /> */}
    </>
  )
}