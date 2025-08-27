import 'server-only'

import sql from '@/lib/config/db'
import { createAuthorDTO } from '@/lib/dto/author-dto'
import { createDataTableResDTO } from '@/lib/dto/datatable-res-dto'

const tableName = 'authors_view'

const AuthorViewDAL = {
  listPaginated: async ({ 
    page = 1, 
    limit = 10, 
    orderBy = 'updated_at',
    orderDir = 'asc',
    search = '', 
  }) => {
    const dataTable = createDataTableResDTO({})
    dataTable.meta.page = page
    dataTable.meta.limit = limit

    const totalItems = (await sql`select * from ${ sql(tableName) }`.raw()).length
    const totalPage = Math.ceil(totalItems / limit)

    dataTable.meta.pageCount = totalPage
    dataTable.meta.itemsCount = totalItems

    if (page <= totalPage) {
      const offset = (page - 1) * limit
      const data = await sql`
        select
          *
        from ${ sql(tableName) }
        ${
          search.trim() !== ''
            ? sql`where full_name like ${'%' + search + '%'}`
            : sql``
        }
        order by ${sql(orderBy)} ${orderDir === 'asc' ? sql`asc` : sql`desc`}
        limit ${limit} offset ${offset}
      `
      
      dataTable.meta.filteredCount = data.length
      dataTable.data = data.map((item) => createAuthorDTO(item))
    }

    return dataTable
  }
}

export default AuthorViewDAL

export {
  tableName
}