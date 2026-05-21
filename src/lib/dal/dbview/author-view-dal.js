import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { createAuthorViewModel } from '@/lib/models/author-view-model'

const tableName = 'authors_view'

const AuthorViewDAL = {
  getAll: async (sql) => {
    return await sql`select * from ${ sql(tableName) }`
  },

  getAllForExcel: async (sql) => {
    return await sql`
      select * from ${ sql(tableName) } 
      order by updated_at desc
    `
  },

  getAllPaginated: async (
    sql,
    data = {
      page: 0, 
      limit: 0, 
      orderBy: '',
      orderDir: '',
      search: '',
      searchFields: [],
    }
  ) => {
    const paginatedData = {
      ...data, 
      tableName, 
    }

    return getPaginatedList(sql, paginatedData)
  },
}

export default AuthorViewDAL

export {
  tableName,
}