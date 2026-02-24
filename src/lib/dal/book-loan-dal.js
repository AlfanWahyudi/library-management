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

  complete: async () => {
    //todo
    return null
  }

}

export default BookLoanDAL


export {
  tableName
}