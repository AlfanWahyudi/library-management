import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'

const tableName = 'books_on_loan_view'

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const BookOnLoanViewDAL = {
  // getAll: async (sql) => {
  //   return await sql`select * from ${ sql(tableName) }`
  // },

  // getAllForExcel: async (sql) => {
  //   return await sql`
  //     select * from ${ sql(tableName) } 
  //     order by updated_at desc
  //   `
  // },

  findByBookId: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')
    return await findByQuery({ sql, field: 'book_id', value: bookId })
  },

  findByMemberId: async (sql, memberId) => {
    if (typeof(memberId) !== 'number') throw new Error('memberId must be a number.')
    return await findByQuery({ sql, field: 'member_id', value: memberId })
  },

  // find: async (sql, bookId, memberId) => {
  //   if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')
  //   if (typeof(memberId) !== 'number') throw new Error('memberId must be a number.')

  //   return await sql`
  //     SELECT 
  //       * FROM ${ sql(tableName) }
  //     WHERE 
  //       bookId = ${bookId} AND memberID = ${memberId}
  //   `
  // },

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

    return await getPaginatedList(sql, paginatedData)
  },
}

export default BookOnLoanViewDAL

export {
  tableName,
}