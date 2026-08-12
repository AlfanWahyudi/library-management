import ContentHead from "@/components/specific/content-head"
import MemberDetailBreadcrumb from "@/components/specific/members/detail/breadcrumb"
import MemberService from "@/lib/services/member-service"
import CardMemberInfo from "@/components/specific/members/detail/card-info"
import CardMemberLoanHist from "@/components/specific/members/detail/card-loan-hist"
import Auth from "@/lib/auth/auth"
import MemberPerm from "@/lib/auth/permission/member-perm"

export default async function MemberDetailPage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const memberPerm = await MemberPerm.validation(session)
    .validateView()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!memberPerm.canView) {
    return "You don't have permission to access this page."
  }

  const { id } = await params
  const member = await MemberService.findById({ id: parseInt(id) })

  return (
    <>
      <h1 className="sr-only">Halaman Detail Anggota Perpustakaan</h1>
      <MemberDetailBreadcrumb />
      <ContentHead pageTitle='Detail Anggota'></ContentHead>
      <section className="flex flex-col gap-6">
        <CardMemberInfo member={member} />
        {/* TODO: validate component ini */}
        <CardMemberLoanHist memberId={member.id} /> 
      </section>
    </>
  )
}