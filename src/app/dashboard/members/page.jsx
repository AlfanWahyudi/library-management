import ContentHead from "@/components/specific/content-head";
import MemberBreadcrumb from "@/components/specific/members/breadcrumb";
import MemberDataTable from "@/components/specific/members/data-table";
import DataTableContextProvider from "@/store/data-table-context";

export default function MemberPage() {
  return(
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Anggota Perpustakaan</h1>
      <MemberBreadcrumb />
      <ContentHead pageTitle='Anggota Perpustakaan'>

      </ContentHead>
      <MemberDataTable />
    </DataTableContextProvider>
  )
}