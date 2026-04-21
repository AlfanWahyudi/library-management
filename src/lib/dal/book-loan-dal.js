import 'server-only'
import { BOOK_LOAN } from '../constants/book-loan'
import { add, endOfDay } from 'date-fns'

const tableName = 'book_loans'


//TODO: get curr user
const tempUserId = '1' // later change this

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
    data
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
          ${ tempUserId },
          NOW(), 
          ${ tempUserId },
          NOW()
        )
      RETURNING *
    `
  },

  complete: async (sql, data) => {
    const { id } = data

    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        finished_date = NOW(), 
        updated_by = ${ tempUserId }, 
        updated_at = NOW()
      WHERE
        id = ${id} AND finished_date IS NULL
      RETURNING * 
    `
  }

}

export default BookLoanDAL


export {
  tableName
}