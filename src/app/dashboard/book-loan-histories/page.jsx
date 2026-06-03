import BookLoanHistoryBreadcrumb from "@/components/specific/book-loan-histories/breadcrumb";
import BookLoanHistDataTable from "@/components/specific/book-loan-histories/data-table";
import BookLoanHistDownloadExcelButton from "@/components/specific/book-loan-histories/download-excel-button";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default function BookLoanHistoryPage() {
  return(
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Riwayat Peminjaman Buku</h1>
        <BookLoanHistoryBreadcrumb />
        <ContentHead pageTitle='Riwayat Peminjaman Buku'>
          <BookLoanHistDownloadExcelButton />
        </ContentHead>
        <BookLoanHistDataTable />
      </DataTableContextProvider>
    </>
  )
}