import BookLoanHistoryBreadcrumb from "@/components/specific/book-loan-histories/breadcrumb";
import BookLoanHistDataTable from "@/components/specific/book-loan-histories/data-table";
import BookLoanHistDownloadExcelButton from "@/components/specific/book-loan-histories/download-excel-button";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default async function BookLoanHistoryPage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()
  const blPerm = await BookLoanPerm.validation(session)
    .validateExportExcelListAllHistory()
    .validateViewListPageHistory()
    .exec()

  
  return(
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Riwayat Peminjaman Buku</h1>
        <BookLoanHistoryBreadcrumb />
        <ContentHead pageTitle='Riwayat Peminjaman Buku'>
          {blPerm.canExportExcelListAllHistory && (<BookLoanHistDownloadExcelButton />)}
        </ContentHead>
        {blPerm.canViewListPageHistory && (<BookLoanHistDataTable />)}
      </DataTableContextProvider>
    </>
  )
}