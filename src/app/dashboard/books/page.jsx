import BookBreadcrumb from "@/components/specific/books/breadcrumb";
import BookDataTable from "@/components/specific/books/data-table";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import Auth from "@/lib/auth/auth";
import BookPerm from "@/lib/auth/permission/book-perm";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default async function BookPage({}) {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const bookPerm = await BookPerm.validation(session)
    .validateCreate()
    .validateViewListPage()
    .validateUpdate()
    .exec()

  return (
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Buku</h1>
      <BookBreadcrumb />
      <ContentHead pageTitle='Buku'>
        {bookPerm.canCreate && (
          <Button size='sm' asChild>
            <Link href='./books/create' title='Tambah buku'>Tambah Buku</Link>
          </Button>
        )}
      </ContentHead>
      {bookPerm.canViewListPage && (<BookDataTable canOpenUpdate={bookPerm.canUpdate}  />)}
    </DataTableContextProvider>
  )
}