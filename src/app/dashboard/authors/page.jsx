import AuthorBreadcrumb from "@/components/specific/authors/breadcrumb";
import AuthorDataTable from "@/components/specific/authors/data-table";
import DownloadPdfButton from "@/components/specific/authors/download-pdf-button";
import SaveSheetAuthor from "@/components/specific/authors/save-sheet";
import ContentHead from "@/components/specific/content-head";

const rightContentItem = (
  <>
    <DownloadPdfButton />
    <SaveSheetAuthor />
  </>
)

//TODO: validate query params with zod schema
export default async function AuthorPage() {
  return (
    <>
      <h1 className="sr-only">Halaman Pengarang</h1>
      <AuthorBreadcrumb />
      <ContentHead
        pageTitle='Pengarang'
        rightContentItem={rightContentItem}
      />
      <AuthorDataTable />
    </>
  )
}
