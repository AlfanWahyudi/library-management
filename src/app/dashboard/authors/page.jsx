import AuthorBreadcrumb from "@/components/dashboard/authors/breadcrumb";
import AuthorDataTable from "@/components/dashboard/authors/data-table";
import DownloadPdfButton from "@/components/dashboard/authors/download-pdf-button";
import SaveSheetAuthor from "@/components/dashboard/authors/save-sheet";
import ContentHead from "@/components/dashboard/content-head";

import AuthorService from "@/lib/services/author-service";

const rightContentItem = (
  <>
    <DownloadPdfButton />
    <SaveSheetAuthor />
  </>
)

//TODO: validate query params with zod schema
export default async function AuthorPage({ searchParams }) {
  const { page, limit, search, searchFields, orderBy, orderDir } = await searchParams

  let items = {
    data: [],
    meta: {}
  }

  if (
    page !== undefined && 
    limit !== undefined && 
    search !== undefined && 
    orderBy !== undefined && 
    orderDir !== undefined
  ) {
    const authors = await AuthorService.getAllPaginated({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      orderBy,
      orderDir,
      searchFields: searchFields.split(',')
    })
    items = {...authors}
  }

  return (
    <>
      <h1 className="sr-only">Halaman Pengarang</h1>
      <AuthorBreadcrumb />
      <ContentHead
        pageTitle='Pengarang'
        rightContentItem={rightContentItem}
      />
      <AuthorDataTable authorItemsPaginated={items} />
    </>
  )
}
