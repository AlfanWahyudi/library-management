import 'server-only'
import sql from '../config/db'


export const getPaginatedList = async ({
  page,
  limit,
  orderBy,
  orderDir,
  search,
  searchFields,
  tableName,
  filterQueries = [],
}) => {
  if (page === null || page === undefined) {
    throw new Error('page property must not be empty.')
  }

  if (limit === null || limit === undefined) {
    throw new Error('limit property must not be empty.')
  }

  if (orderBy === null || orderBy === undefined) {
    throw new Error('orderBy property must not be empty.')
  }

  if (orderDir === null || orderDir === undefined) {
    throw new Error('orderDir property must not be empty.')
  }

  if (tableName === null || tableName === undefined || tableName === '') {
    throw new Error('tableName property must not be empty.')
  }

  if (
    (search === null || search === undefined) &&
    searchFields.length === 0 
  ) {
    throw new Error('search and searchFields properties must not be empty.')
  }

  if ((search && search.length > 0) && (searchFields.length === 0)) {
    throw new Error(`searchFields must not be empty when search is already filled.`)
  }

  if (filterQueries && !Array.isArray(filterQueries)) {
    throw new Error(`filterQueries must be non-empty array`)
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
      search.trim() !== '' || (filterQueries && filterQueries.length > 0)
        ? sql`WHERE 
          ${search.trim() !== ''
            ? sql`CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}`
            : sql``
          }
          ${
            // TODO: test jika filterQueries nya lebih dari satu, apakan akan tetap berhasil
            filterQueries && filterQueries.length > 0
            ? sql`${
              filterQueries.flatMap(((query, idx) => (
                [
                  idx > 0 
                    ? sql`AND` 
                    : search.trim() !== '' ? sql`AND` : sql``, 
                  sql`${query}`,
                ]
              )))
            }`
            : sql``
          }
        `
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