import ContentHead from "@/components/specific/content-head"
import MemberBreadcrumb from "@/components/specific/members/breadcrumb"
import MemberForm from "@/components/specific/members/form"
import MemberUpdateBreadcrumb from "@/components/specific/members/update/breadcrumb"
import MemberService from "@/lib/services/member-service"

export default async function MemberUpdatePage({ params }) {
  const { id } = await params
  const member = await MemberService.findById({ id: parseInt(id) })

  return (
    <>
      <h1 className="sr-only">Halaman Update Anggota Perpustakaan</h1>
      <MemberUpdateBreadcrumb />
      <ContentHead pageTitle='Update Anggota'></ContentHead>
      <MemberForm member={member} viewOnly={false} />
    </>
  )
}