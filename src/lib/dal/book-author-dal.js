import 'server-only'

const tableName = 'book_authors'


//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const BookAuthorDAL = {
  findByBookId: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')

    return await findByQuery({ sql, field: 'book_id', value: bookId })
  },

  findByAuthorId: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    return await findByQuery({ sql, field: 'author_id', value: authorId })
  },
}

export default BookAuthorDAL


export {
  tableName
}