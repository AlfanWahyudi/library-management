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
    }
  ) => {

    const paginatedData = {
      ...data,
      tableName,
    }

    return await getPaginatedList(sql, paginatedData)
  },
  
}

export default BookLoanHistViewDAL

