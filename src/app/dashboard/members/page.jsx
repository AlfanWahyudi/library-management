import ContentHead from "@/components/specific/content-head";
import MemberBreadcrumb from "@/components/specific/members/breadcrumb";
import MemberDataTable from "@/components/specific/members/data-table";
import { Button } from "@/components/ui/button";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default function MemberPage() {
  return(
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Anggota Perpustakaan</h1>
      <MemberBreadcrumb />
      <ContentHead pageTitle='Anggota Perpustakaan'>
        <Button size='sm' asChild>
          <Link href='./members/create' title='Tambah anggota'>Tambah Anggota</Link>
        </Button>
      </ContentHead>
      <MemberDataTable />
    </DataTableContextProvider>
  )
}