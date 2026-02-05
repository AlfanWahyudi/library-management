import 'server-only'

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
}

export default BookLoanDAL


export {
  tableName
}