import 'server-only'

import { createAuthor } from '../models/author-model'
import { dataDeleted, dataNotDeleted } from '../utils/server/sql'
import { createBook } from '../models/book-model'

const tableName = 'authors'

//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const mapResult = (author) => {
  return author
    ? createAuthor(author)
    : null
}

const AuthorDAL = {
  findById: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    const [author] = await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE
        id = ${authorId} AND
        ${ dataNotDeleted() }
    `

    return mapResult(author)
  },

  save: async (
    sql,
    data,
    authorId = null,
  ) => {
    const { fullName, countryCode, about, activeSince } = data

    if (activeSince !== null && parseInt(activeSince) < 0) {
      throw new Error('activeSince property cannot less than 0.')
    }

    let result = null

    if (authorId === null) {
      const [author] = await sql`
        INSERT INTO ${ sql(tableName) }
          (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at)
        VALUES
          (
            ${ fullName }, 
            ${ countryCode }, 
            ${ activeSince }, 
            ${ about }, 
            ${ tempUsername },
            NOW(), 
            ${ tempUsername },
            NOW()
          )
        RETURNING *
      `

      result = author
    } else {
     const [author] = await sql`
        UPDATE ${ sql(tableName) } 
        SET 
          full_name = ${ fullName }, 
          country_code = ${ countryCode }, 
          active_since = ${ activeSince },
          about = ${ about }, 
          updated_by = ${ tempUsername }, 
          updated_at = NOW()
        WHERE
          id = ${authorId} AND
          ${ dataNotDeleted() }
        RETURNING *
      `

      result = author
    }

    return mapResult(result)
  },

  delete: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    const [author] = await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = ${ tempUsername }, 
        deleted = NOW()
      WHERE
        id = ${authorId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `

    return mapResult(author)
  },

  restore: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    const [author] = await sql`
      UPDATE ${ sql(tableName) } 
      SET
        deleted_by = NULL, 
        deleted_at = NULL
      WHERE
        id = ${authorId} AND
        ${ dataDeleted() }
      RETURNING *
    `

    return mapResult(author)
  },

  getBooks: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('id must be a number.')
    
    const books = await sql`
      SELECT 
        b.id,
        b.isbn,
        b.title,
        b.sub_title,
        b.publisher,
        b.publication_date,
        b.page,
        b.language,
        b.edition,
        b.created_by,
        b.updated_by,
        b.created_at,
        b.updated_at
      FROM 
        books as b
      JOIN 
        book_authors ba ON ba.book_id = b.id
      WHERE
        ba.author_id = ${authorId}
    `

    return books.map((book) => createBook({...book}))
  }
}

export default AuthorDAL


export {
  tableName
}