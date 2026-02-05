import BookBreadcrumb from "@/components/specific/books/breadcrumb";
import BookDataTable from "@/components/specific/books/data-table";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";

export default function BookPage({}) {
  return (
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Buku</h1>
      <BookBreadcrumb />
      <ContentHead pageTitle='Buku'>
        <Button size='sm' asChild>
          <Link href='./books/create' title='Tambah buku'>Tambah Buku</Link>
        </Button>
      </ContentHead>
      <BookDataTable />
    </DataTableContextProvider>
  )
}