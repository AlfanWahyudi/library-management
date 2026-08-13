import ForbiddenErrAlert from "@/components/common/error/forbidden-err-alert"
import ContentHead from "@/components/specific/content-head"
import MemberForm from "@/components/specific/members/form"
import MemberUpdateBreadcrumb from "@/components/specific/members/update/breadcrumb"
import Auth from "@/lib/auth/auth"
import MemberPerm from "@/lib/auth/permission/member-perm"
import MemberService from "@/lib/services/member-service"

export default async function MemberUpdatePage({ params }) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const memberPerm = await MemberPerm.validation(session)
    .validateUpdate()
    .exec()

  if (!memberPerm.canUpdate) {
    return <ForbiddenErrAlert />
  }
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