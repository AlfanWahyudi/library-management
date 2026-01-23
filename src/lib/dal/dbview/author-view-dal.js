import 'server-only'

import sql from '@/lib/config/db'
import { getPaginatedList } from '@/lib/utils/server/datatable'
import { createAuthorViewModel } from '@/lib/models/author-view-model'
import { sq } from 'date-fns/locale'

const tableName = 'authors_view'
const tableFields = ['id', 'full_name', 'book_count', 'country_code', 'country_name', 'active_since', 'about', 'created_at', 'updated_at']

const AuthorViewDAL = {
  getAll: async (sql) => {
    return await sql`select * from ${ sql(tableName) }`
  },

  getAllForExcel: async (sql) => {
    const result = []

    await sql`
      select * from ${ sql(tableName) } 
      order by ${ sql(tableFields[8]) } desc
    `.forEach(row => {
      result.push(createAuthorViewModel({...row}))
    })

    return result
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

    const paginatedItems = await getPaginatedList(sql, paginatedData)

    paginatedItems.data = paginatedItems.data.map((item) => createAuthorViewModel({...item}))

    return paginatedItems
  },
}

export default AuthorViewDAL

export {
  tableName,
  tableFields
}