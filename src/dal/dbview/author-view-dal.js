import 'server-only'

import sql from '@/lib/db'

const tableName = 'authors_view'

const AuthorViewDAL = {
  listPaginated: async ({ 
    page = 1, 
    limit = 10, 
    orderBy = 'updated_at',
    orderDir = 'asc',
    search = '', 
  }) => {

    const result = {
      data: [],
      meta: {
        page,
        search,
        orderBy,
        orderDir,
        limit,
        page_count: 0,
        items_count: 0,
        filtered_count: 0,
      }
    }

    const totalItems = (await sql`select * from ${ sql(tableName) }`.raw()).length
    const totalPage = Math.ceil(totalItems / limit)

    result.meta.page_count = totalPage
    result.meta.items_count = totalItems

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
      
      result.meta.filtered_count = data.length
      result.data = data.map((item) => {
        return {
          id: item.id,
          fullName: item.full_name,
          bookCount: item.book_count !== null && parseInt(item.book_count),
          nationality: item.nationality,
          activeSince: item.active_since,
          about: item.about,
          createdAt: item.created_at.toString(),
          updatedAt: item.updated_at.toString()
        }
      })
    }

    return result
  }
}

export default AuthorViewDAL

export {
  tableName
}