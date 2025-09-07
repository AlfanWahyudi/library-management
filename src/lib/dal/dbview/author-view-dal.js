import 'server-only'

import sql from '@/lib/config/db'
import { getPaginatedList } from '@/lib/utils/datatable'

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

    return await getPaginatedList({
      page,
      limit,
      orderBy,
      orderDir,
      search,
      searchFields,
      tableName
    })
  }
}

export default AuthorViewDAL

export {
  tableName
}