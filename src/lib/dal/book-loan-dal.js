import 'server-only'
import { BOOK_LOAN } from '../constants/book-loan'
import { add, endOfDay } from 'date-fns'
import { getPaginatedList } from '../utils/server/datatable'

const tableName = 'book_loans'


const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const BookLoanDAL = {
  findStillLoanById: async (sql, id) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE 
        id = ${id} AND finished_date IS NULL
    `
  },

  findCompleteLoanById: async (sql, id) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE 
        id = ${id} AND finished_date IS NOT NULL
    `
  },

  findByBookId: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')

    return await findByQuery({ sql, field: 'book_id', value: bookId })
  },

  save: async (
    sql,
    data,
    currUserId
  ) => {
    const {
      bookId,
      memberId,
    } = data

    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')
    if (typeof(memberId) !== 'number') throw new Error('memberId must be a number.')

    const startDate = new Date()
    const endDate = new Date(endOfDay(add(startDate, { days: BOOK_LOAN.PERIOD_DAY })))

    return await sql`
      INSERT INTO ${ sql(tableName) }
        (book_id, member_id, start_date, end_date, created_by, created_at, updated_by, updated_at)
      VALUES
        (
          ${ bookId }, 
          ${ memberId }, 
          NOW(), 
          ${ endDate }, 
          ${ currUserId },
          NOW(), 
          ${ currUserId },
          NOW()
        )
      RETURNING *
    `
  },

  complete: async (sql, data, currUserId) => {
    const { id } = data

    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        finished_date = NOW(), 
        updated_by = ${ currUserId }, 
        updated_at = NOW()
      WHERE
        id = ${id} AND finished_date IS NULL
      RETURNING * 
    `
  },

  total: async (sql) => {
    return await sql`
      SELECT 
        COUNT(id) as total 
      FROM ${ sql(tableName) }
      WHERE finished_date IS NOT NULL;
    `
  },

  totalCompleteYearAll: async (sql) => {
    return await sql`
      SELECT
        EXTRACT(YEAR FROM start_date) AS year,
        COUNT(id) AS total
      FROM ${ sql(tableName) } 
      WHERE finished_date IS NOT NULL
      GROUP BY EXTRACT(YEAR FROM start_date)
      ORDER BY year;
    `
  },
  
  totalCompleteYear: async (sql, year) => {
    return await sql`
      SELECT
        EXTRACT(MONTH FROM start_date) AS month,
        COUNT(id) AS total
      FROM ${ sql(tableName) } 
      WHERE 
        finished_date IS NOT NULL AND 
        EXTRACT(YEAR FROM start_date) = ${ year }
      GROUP BY EXTRACT(MONTH FROM start_date)
      ORDER BY month;
    `
  },

  totalCompleteMonth: async (sql, year, month) => {
    return await sql`
      SELECT
          EXTRACT(DAY FROM start_date) AS day,
          COUNT(id) AS total
      FROM ${ sql(tableName) }
      WHERE 
        finished_date IS NOT NULL AND 
        EXTRACT(YEAR FROM start_date) = ${ year } AND 
        EXTRACT(MONTH FROM start_date) = ${ month }
      GROUP BY EXTRACT(DAY FROM start_date)
      ORDER BY day;
    `
  },

}

export default BookLoanDAL


export {
  tableName
}