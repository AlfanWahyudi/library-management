import BookLoanBreadcrumb from "@/components/specific/book-loans/breadcrumb";
import BookLoanDataTable from "@/components/specific/book-loans/data-table";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import Auth from "@/lib/auth/auth";
import BookLoanPerm from "@/lib/auth/permission/book-loan-perm";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default async function BookLoanPage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const blPerm = await BookLoanPerm.validation(session)
    .validateCreate()
    .validateViewListPage()
    .validateCompleteLoan()
    .exec()

  return(
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Peminjaman Buku</h1>
        <BookLoanBreadcrumb />
        <ContentHead pageTitle='Peminjaman Buku'>
          {blPerm.canCreate && (
            <Button>
              <Link href='./book-loans/create' title='Tambah peminjaman buku'>Tambah peminjaman buku</Link>
            </Button>
          )}
        </ContentHead>
        {blPerm.canViewListPage && (<BookLoanDataTable canOpenComplete={blPerm.canCompleteLoan} />)}
      </DataTableContextProvider>
    </>
  )
}