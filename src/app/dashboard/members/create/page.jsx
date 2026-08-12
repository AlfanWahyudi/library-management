import ContentHead from "@/components/specific/content-head";
import MemberCreateBreadcrumb from "@/components/specific/members/create/breadcrumb";
import MemberForm from "@/components/specific/members/form";
import Auth from "@/lib/auth/auth";
import MemberPerm from "@/lib/auth/permission/member-perm";


export default async function MemberCreatePage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const memberPerm = await MemberPerm.validation(session)
    .validateCreate()
    .exec()

  // TODO: rapihkan tampilan pesan validasi nya
  if (!memberPerm.canCreate) {
    return "You don't have permission to access this page."
  }

  return (
    <>
      <h1 className="sr-only">Halaman Tambah Anggota</h1>
      <MemberCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Anggota'></ContentHead>
      <MemberForm />
    </>
  )
}