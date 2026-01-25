import ViolationBreadcrumb from "@/components/specific/violations/breadcrumb";
import ContentHead from "@/components/specific/content-head";
import { Button } from "@/components/ui/button";
import DataTableContextProvider from "@/store/data-table-context";
import Link from "next/link";
import ViolationDataTable from "@/components/specific/violations/data-table";

export default function ViolationSanctionsPage() {
  return(
    <DataTableContextProvider>
      <h1 className="sr-only">Halaman Pelanggaran</h1>
      <ViolationBreadcrumb />
      <ContentHead pageTitle='Pelanggaran'>
        <Button size='sm' asChild>
          <Link href='#' title='Tambah anggota'>Tambah Pelanggaran</Link>
        </Button>
      </ContentHead>
      <ViolationDataTable />
    </DataTableContextProvider>
  )
}