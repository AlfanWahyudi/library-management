import ContentHead from "@/components/specific/content-head";
import MemberBreadcrumb from "@/components/specific/members/breadcrumb";
import MemberForm from "@/components/specific/members/form";


export default function MemberCreatePage() {
  return (
    <>
    <h1 className="sr-only">Halaman Tambah Anggota</h1>
    <MemberBreadcrumb />
    <ContentHead pageTitle='Tambah Anggota'></ContentHead>
    <MemberForm />
    </>
  )
}