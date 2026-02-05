import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { tableName as tableAuthor } from './author-dal'
import { tableName as tableBookAuthor } from './book-author-dal'
import { dataDeleted, dataNotDeleted } from '../utils/server/sql'

const tableName = 'books'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE 
      ${ sql(field) } = ${value} AND
      ${ dataNotDeleted() }
  `
}

const BookDAL = {
  findById: async (sql, bookId, excludeSoftDeleted = false) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')
    
    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE
        id = ${bookId}
        ${ 
          excludeSoftDeleted 
            ? sql``
            : sql`AND ${ dataNotDeleted() }`
        }
    `
  },

  findByIsbn: async (sql, isbn) => {
    if (isbn === null) throw new Error('isbn must not be null')

    return await findByQuery({ sql, field: 'isbn', value: isbn })
  },

  getAuthors: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')

    return await sql`
      SELECT 
        * 
      FROM ${ sql(tableAuthor) } a
      JOIN ${ sql(tableBookAuthor) } ba ON ba.author_id = a.id
      WHERE 
        ba.book_id = ${bookId} AND
        ${ dataNotDeleted('a') }
    `
  },

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
      isSoftDeleted: true,
    }

    return await getPaginatedList(sql, paginatedData)
  },

  create: async (sql, data) => {
    const {
      isbn,
      title,
      subTitle,
      publisher,
      publicationDate,
      page,
      language,
      edition,
    } = data

    return await sql`
      INSERT INTO ${ sql(tableName) }
        (isbn, title, sub_title, publisher, publication_date, page, language, edition,  created_by, created_at, updated_by, updated_at)
      VALUES
        (
          ${ isbn }, 
          ${ title }, 
          ${ subTitle }, 
          ${ publisher }, 
          ${ publicationDate }, 
          ${ page }, 
          ${ language }, 
          ${ edition }, 
          ${ tempUsername },
          NOW(), 
          ${ tempUsername },
          NOW()
        )
      RETURNING *
    `
  },

  update: async (sql, data, bookId) => {
    const {
      isbn,
      title,
      subTitle,
      publisher,
      publicationDate,
      page,
      language,
      edition,
    } = data

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        isbn = ${ isbn }, 
        title = ${ title }, 
        sub_title = ${ subTitle }, 
        publisher = ${ publisher }, 
        publication_date = ${ publicationDate }, 
        page = ${ page }, 
        language = ${ language }, 
        edition = ${ edition }, 
        updated_by = ${ tempUsername }, 
        updated_at = NOW()
      WHERE
        id = ${bookId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },

  delete: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = ${ tempUsername }, 
        deleted_at = NOW()
      WHERE
        id = ${bookId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },

  
  restore: async (sql, bookId) => {
    if (typeof(bookId) !== 'number') throw new Error('bookId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = NULL, 
        deleted_at = NULL
      WHERE
        id = ${bookId}
      RETURNING *
    `
  },
}

export default BookDAL

export {
  tableName,
}