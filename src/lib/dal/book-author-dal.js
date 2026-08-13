import 'server-only'

const tableName = 'book_authors'


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

  create: async (sql, data, currUserId) => {
    const {
      authorId,
      bookId,
    } = data

    return await sql`
      INSERT INTO ${ sql(tableName) }
        (author_id, book_id, created_by, created_at)
      VALUES
        (
          ${ authorId }, 
          ${ bookId }, 
          ${ currUserId },
          NOW()
        )
      RETURNING *
    `
  },

  delete: async (sql, data) => {
    const {
      authorId,
      bookId,
    } = data

    return await sql`
      DELETE 
        FROM ${ sql(tableName) }
      WHERE 
        author_id = ${authorId} AND
        book_id = ${bookId}
      RETURNING *
    `
  },

  deleteAllByBookId: async (sql, bookId) => {
    return await sql`
      DELETE 
        FROM ${ sql(tableName) }
      WHERE
        book_id = ${bookId}
      RETURNING *
    `
  }
}

export default BookAuthorDAL


export {
  tableName
}