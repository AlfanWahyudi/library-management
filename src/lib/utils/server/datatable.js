import 'server-only'

import sql from '../../config/db'
import { dataNotDeleted } from './sql'

const filtering = ({
  search,
  filterQueries,
  searchFields,
  isSoftDeleted
}) => {
  return sql`
    ${
      isSoftDeleted 
        ? sql`WHERE ${ dataNotDeleted() }`
        : sql``
    }
    ${
      search.trim() !== ''
        ? sql` ${isSoftDeleted ? sql`AND` : sql`WHERE`} CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}`
        : sql``
    }
    ${
      // TODO: test jika filterQueries nya lebih dari satu, apakan akan tetap berhasil
      filterQueries && filterQueries.length > 0
        ? sql`${
          // filterQueries.flatMap(((query) => sql` AND ${query}`))
          filterQueries.flatMap(((query, idx) => {
            return idx === 0
              ? sql `
                ${
                  isSoftDeleted
                    ? sql `AND`
                    : search.trim() !== ''
                      ? sql `AND`
                      : sql `WHERE`
                }
                ${query}
              `
              : sql ` AND ${query}`
          }))
        }`
        : sql``
    }

  `
}


export const getPaginatedList = async ({
  page,
  limit,
  orderBy,
  orderDir,
  search,
  searchFields,
  tableName,
  isSoftDeleted = false,
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

  const queryCount = await sql`
    SELECT
      COUNT(*)
    FROM ${sql(tableName)}
    ${ filtering({ search, searchFields, filterQueries, isSoftDeleted }) }
  `
  
  const itemsCount = queryCount[0].count
  const pageCount = Math.ceil(itemsCount/limit)

  const offset = page * limit
  const dataWithLimit = await sql`
    SELECT
      *
    FROM ${sql(tableName)}
    ${ filtering({ search, searchFields, filterQueries, isSoftDeleted }) }
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