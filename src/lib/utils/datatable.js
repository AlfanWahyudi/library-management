import 'server-only'
import sql from '../config/db'


export const getPaginatedList = async ({
  page,
  limit,
  orderBy,
  orderDir,
  search,
  searchFields,
  tableName
}) => {
  if (
    (search === null || search === undefined) &&
    searchFields.length === 0 
  ) {
    throw new Error('search and searchFields properties must not be empty.')
  }

  const data = await sql`
    SELECT
      *
    FROM ${sql(tableName)}
    ${
      search.trim() !== ''
        ? sql`WHERE CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}`
        : sql``
    }
  `
  const itemsCount = data.length
  const pageCount = Math.ceil(itemsCount/limit)

  const offset = page * limit
  const dataWithLimit = await sql`
    SELECT
      *
    FROM ${sql(tableName)}
    ${
      search.trim() !== ''
        ? sql`WHERE CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}`
        : sql``
    }
    ORDER BY ${sql(orderBy)} ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
    LIMIT ${limit} OFFSET ${offset}
  `
  return {
    data: dataWithLimit,
    meta: {
      page,
      limit,
      dataCount: dataWithLimit.length,
      pageCount,
      itemsCount,
    }
  }
}