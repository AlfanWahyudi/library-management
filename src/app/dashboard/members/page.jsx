import ContentHead from "@/components/specific/content-head";
import MemberBreadcrumb from "@/components/specific/members/breadcrumb";
import MemberDataTable from "@/components/specific/members/data-table";
import MemberDownloadExcelButton from "@/components/specific/members/download-excel-button";
import { Button } from "@/components/ui/button";
import Auth from "@/lib/auth/auth";
import MemberPerm from "@/lib/auth/permission/member-perm";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default async function MemberPage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const memberPerm = await MemberPerm.validation(session)
    .validateExportExcelListAll()
    .validateCreate()
    .validateUpdate()
    .validateViewListPage()
    .exec()

  return(
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Anggota Perpustakaan</h1>
      <MemberBreadcrumb />
      <ContentHead pageTitle='Anggota Perpustakaan'>
        {memberPerm.canExportExcelListAll && (<MemberDownloadExcelButton />)}
        {memberPerm.canCreate && (
          <Button size='sm' asChild>
            <Link href='./members/create' title='Tambah anggota'>Tambah Anggota</Link>
          </Button>
        )}
      </ContentHead>
      {memberPerm.canViewListPage && (<MemberDataTable canOpenUpdate={memberPerm.canUpdate} />)}
    </DataTableContextProvider>
  )
}