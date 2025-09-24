import { Button } from "@/components/ui/button";
import ContentHead from "../components/content-head";
import AuthorBreadcrumb from "./components/breadcrumb";
import AuthorDataTable from "./components/data-table";
import AuthorService from "@/lib/services/author-service";
import SaveSheetAuthor from "./components/save-sheet";

const rightContentItem = (
  <>
    <Button variant='outline' size='sm'>Download PDF</Button>
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
      {/* //TODO: Soft deleted data masih muncul */}
      <AuthorDataTable authorItemsPaginated={items} />
    </>
  )
}
