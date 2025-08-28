import 'server-only'

import sql from '@/lib/config/db'

const tableName = 'authors_view'

const AuthorViewDAL = {
  getAll: async () => {
    return await sql`select * from ${ sql(tableName) }`
  },

  getAllPaginated: async ({ 
    page, 
    limit, 
    orderBy,
    orderDir,
    search
  }) => {
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
    return data
  }
}

export default AuthorViewDAL

export {
  tableName
}