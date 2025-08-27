import AuthorViewDAL from "@/dal/dbview/author-view-dal";
import AuthorDataTable from "./author-datatable";

export default async function AuthorPage({ searchParams }) {
  const { 
    page, 
    limit, 
    search, 
    order_by: orderBy, 
    order_dir: orderDir 
  } = await searchParams

  const paginate = {
    page: page !== undefined ? parseInt(page) : 1,
    limit: limit !== undefined ? parseInt(limit) : 10,
    search: search !== undefined ? search : '',
    orderBy: orderBy !== undefined ? orderBy : 'updated_at',
    orderDir: orderDir !== undefined ? orderDir : 'asc',
  }

  const data = await AuthorViewDAL.listPaginated({...paginate})

  console.log(data)

  return (
    <>
      <AuthorDataTable authorItemsPaginated={data} />
    </>
  )
}