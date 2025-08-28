import AuthorDataTable from "./author-datatable";
import AuthorService from "@/lib/services/author-service";

export default async function AuthorPage({ searchParams }) {
  const param = await searchParams

  const paginate = {
    page: param.page !== undefined ? parseInt(param.page) : 1,
    limit: param.limit !== undefined ? parseInt(param.limit) : 10,
    search: param.search !== undefined ? param.search : '',
    orderBy: param.orderBy !== undefined ? param.orderBy : 'updated_at',
    orderDir: param.orderDir !== undefined ? param.orderDir : 'asc',
  }

  const data = await AuthorService.getAllPaginated(paginate)

  console.log(data)

  return (
    <>
      <AuthorDataTable authorItemsPaginated={data} />
    </>
  )
}