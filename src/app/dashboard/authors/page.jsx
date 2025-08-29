import AuthorDataTable from "./author-datatable";
import AuthorService from "@/lib/services/author-service";

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
      <AuthorDataTable authorItemsPaginated={items} />
    </>
  )
}