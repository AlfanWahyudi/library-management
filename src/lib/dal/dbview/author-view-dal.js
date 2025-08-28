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
    search,
    searchFields = [],
  }) => {
    if (
      (search === null || search === undefined) &&
      searchFields.length === 0 
    ) {
      throw new Error('search and searchFields properties must not be empty.')
    }

    const offset = (page - 1) * limit
    const data = await sql`
      SELECT
        *
      FROM ${ sql(tableName) }
      ${
        search.trim() !== ''
          ? sql`WHERE CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}`
          : sql``
      }
      ORDER BY ${sql(orderBy)} ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
      LIMIT ${limit} OFFSET ${offset}
    `
    return data
  }
}

export default AuthorViewDAL

export {
  tableName
}