import BookUpdateBreadcrumb from "@/components/specific/books/update/breadcrumb"
import ContentHead from "@/components/specific/content-head"

// TODO
export default async function BookUpdatePage({ params }) {
  // const { id } = await params
  // const member = await MemberService.findById({ id: parseInt(id) })

  return (
    <>
      <h1 className="sr-only">Halaman Update Buku</h1>
      <BookUpdateBreadcrumb />
      <ContentHead pageTitle='Update Buku'></ContentHead>
      {/* <MemberForm member={member} viewOnly={false} /> */}
    </>
  )
}