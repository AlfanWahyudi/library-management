import 'server-only'

import { BOOK_LOAN } from '../constants/book-loan'
import { add, endOfDay } from 'date-fns'
import { dataNotDeleted } from '../utils/server/sql'

import { tableName as tableBook } from './book-dal'

const tableName = 'book_loans'

const BookLoanDAL = {
  findStillLoanById: async (sql, id) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      SELECT 
        bl.id,
        bl.member_id,
        bl.book_id,
        bl.start_date,
        bl.end_date,
        bl.finished_date,
        bl.created_by,
        bl.created_at,
        bl.updated_by,
        bl.updated_at
      FROM 
        ${ sql(tableName) } bl
      JOIN 
        ${ sql(tableBook) } as b ON bl.book_id = b.id
      WHERE 
        bl.id = ${id} AND 
        bl.finished_date IS NULL AND
        ${ dataNotDeleted('b') };  
    `
  },

  findCompleteLoanById: async (sql, id) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    return await sql`
      SELECT 
        bl.id,
        bl.member_id,
        bl.book_id,
        bl.start_date,
        bl.end_date,
        bl.finished_date,
        bl.created_by,
        bl.created_at,
        bl.updated_by,
        bl.updated_at
      FROM 
        ${ sql(tableName) } bl
      JOIN 
        ${ sql(tableBook) } as b ON bl.book_id = b.id
      WHERE 
        bl.id = ${id} AND 
        bl.finished_date IS NOT NULL AND
        ${ dataNotDeleted('b') };
    `
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
        COUNT(bl.id) as total 
      FROM 
        ${ sql(tableName) } bl
      JOIN 
        ${ sql(tableBook) } as b ON bl.book_id = b.id
      WHERE 
        finished_date IS NOT NULL AND
        ${ dataNotDeleted('b') }
      ;
    `
  },

  totalCompleteYearAll: async (sql) => {
    return await sql`
      SELECT
        EXTRACT(YEAR FROM bl.start_date) AS year,
        COUNT(bl.id) AS total
      FROM 
        ${ sql(tableName) } as bl
      JOIN 
        ${ sql(tableBook) } as b ON bl.book_id = b.id
      WHERE 
        bl.finished_date IS NOT NULL AND
        ${ dataNotDeleted('b') }
      GROUP BY 
        EXTRACT(YEAR FROM bl.start_date)
      ORDER BY year;
    `
  },
}

export default BookLoanDAL


export {
  tableName
}