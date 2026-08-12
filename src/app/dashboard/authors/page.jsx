import AuthorBreadcrumb from "@/components/specific/authors/breadcrumb";
import AuthorDataTable from "@/components/specific/authors/data-table";
import DownloadExcelButton from "@/components/specific/authors/download-excel-button";
import SaveSheetAuthor from "@/components/specific/authors/save-sheet";
import ContentHead from "@/components/specific/content-head";
import Auth from "@/lib/auth/auth";
import AuthorPerm from "@/lib/auth/permission/author-perm";
import DataTableContextProvider from "@/store/data-table-context";

export default async function AuthorPage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const authorPerm = await AuthorPerm.validation(session)
    .validateCreate()
    .validateViewListPage()
    .validateExportExcelListAll()
    .exec()

  return (
    <>
      <DataTableContextProvider>
        <h1 className="sr-only">Halaman Pengarang</h1>
        <AuthorBreadcrumb />
        <ContentHead pageTitle='Pengarang'>
          {authorPerm.canExportExcelListAll && (<DownloadExcelButton />)}
          {authorPerm.canCreate && (<SaveSheetAuthor />)}
        </ContentHead>
        {authorPerm.canViewListPage && (<AuthorDataTable />)}
      </DataTableContextProvider>
    </>
  )
}
