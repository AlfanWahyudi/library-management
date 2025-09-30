import 'server-only'

import sql from '@/lib/config/db'
import { getPaginatedList } from '@/lib/utils/datatable'
import { createAuthorViewModel } from '@/lib/models/author-view-model'

const tableName = 'authors_view'
const tableFields = ['id', 'full_name', 'book_count', 'country_code', 'country_name', 'active_since', 'about', 'created_at', 'updated_at']

const AuthorViewDAL = {
  getAll: async () => {
    return await sql`select * from ${ sql(tableName) }`
  },

  getAllForExcel: async () => {
    const authors = await sql`select * from ${ sql(tableName) } order by ${ sql(tableFields[8]) } desc`
    return authors.map((author) => createAuthorViewModel({...author}))
  },

  getAllPaginated: async ({ 
    page = 0, 
    limit = 10, 
    orderBy = 'updated_at',
    orderDir = 'desc',
    search = '',
    searchFields = [],
  }) => {
    const paginatedItems = await getPaginatedList({
      page,
      limit,
      orderBy,
      orderDir,
      search,
      searchFields,
      tableName
    })

    paginatedItems.data = paginatedItems.data.map((item) => createAuthorViewModel({...item}))

    return paginatedItems
  }
}

export default AuthorViewDAL

export {
  tableName,
  tableFields
}