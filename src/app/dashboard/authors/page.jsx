import AuthorBreadcrumb from "@/components/specific/authors/breadcrumb";
import AuthorDataTable from "@/components/specific/authors/data-table";
import DownloadExcelButton from "@/components/specific/authors/download-excel-button";
import SaveSheetAuthor from "@/components/specific/authors/save-sheet";
import ContentHead from "@/components/specific/content-head";
import DataTableContextProvider from "@/store/data-table-context";

export default async function AuthorPage() {
  return (
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Pengarang</h1>
        <AuthorBreadcrumb />
        <ContentHead pageTitle='Pengarang'>
          <DownloadExcelButton />
          <SaveSheetAuthor />
        </ContentHead>
        <AuthorDataTable />
      </DataTableContextProvider>
    </>
  )
}
