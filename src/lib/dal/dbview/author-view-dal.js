import 'server-only'

import sql from '@/lib/config/db'
import { getPaginatedList } from '@/lib/utils/datatable'
import { createAuthorViewModel } from '@/lib/models/author-view-model'

const tableName = 'authors_view'

const AuthorViewDAL = {
  getAll: async () => {
    return await sql`select * from ${ sql(tableName) }`
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
  tableName
}