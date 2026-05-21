import ContentHead from "@/components/specific/content-head";
import MemberCreateBreadcrumb from "@/components/specific/members/create/breadcrumb";
import MemberForm from "@/components/specific/members/form";


export default function MemberCreatePage() {
  return (
    <>
      <h1 className="sr-only">Halaman Tambah Anggota</h1>
      <MemberCreateBreadcrumb />
      <ContentHead pageTitle='Tambah Anggota'></ContentHead>
      <MemberForm />
    </>
  )
}