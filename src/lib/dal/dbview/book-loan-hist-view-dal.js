import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'

const tableName = 'book_loan_hist_view'

const BookLoanHistViewDAL = {
  findAllForExcel: async (sql) => await sql`
    SELECT * FROM ${ sql(tableName) } 
    ORDER BY finished_date DESC 
  `,

  getAllPaginated: async (
    sql,
    data = {
      page: 0, 
      limit: 0, 
      orderBy: '',
      orderDir: '',
      search: '',
      searchFields: [],
      bookId: null,
    }
  ) => {
    const { bookId } = data

    const filterQueries = []

    if (bookId && typeof(bookId) === 'number') {
      filterQueries.push(sql`${sql('book_id')} = ${bookId}`)
    }

    const paginatedData = {
      ...data,
      tableName,
      filterQueries,
    }

    return await getPaginatedList(sql, paginatedData)
  },
  
}

export default BookLoanHistViewDAL

