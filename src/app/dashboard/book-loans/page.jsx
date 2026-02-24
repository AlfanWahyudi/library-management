import BookLoanBreadcrumb from "@/components/specific/book-loans/breadcrumb";
import BookLoanDataTable from "@/components/specific/book-loans/data-table";
import SaveSheetBookLoan from "@/components/specific/book-loans/save-sheet";
import ContentHead from "@/components/specific/content-head";
import DataTableContextProvider from "@/store/data-table-context";

export default function BookLoanPage() {
  return(
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Peminjaman Buku</h1>
        <BookLoanBreadcrumb />
        <ContentHead pageTitle='Peminjaman Buku'>
          <SaveSheetBookLoan />
        </ContentHead>
        <BookLoanDataTable />
      </DataTableContextProvider>
    </>
  )
}