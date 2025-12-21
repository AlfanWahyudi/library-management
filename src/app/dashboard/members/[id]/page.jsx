import ContentHead from "@/components/specific/content-head"
import MemberBreadcrumb from "@/components/specific/members/breadcrumb"
import MemberDetailBreadcrumb from "@/components/specific/members/detail/breadcrumb"
import MemberForm from "@/components/specific/members/form"
import MemberService from "@/lib/services/member-service"

export default async function MemberDetailPage({ params }) {
  const { id } = await params
  const member = await MemberService.findById({ id: parseInt(id) })

  return (
    <>
      <h1 className="sr-only">Halaman Detail Anggota Perpustakaan</h1>
      <MemberDetailBreadcrumb />
      <ContentHead pageTitle='Detail Anggota'></ContentHead>
      <MemberForm member={member} viewOnly={true} />
    </>
  )
}