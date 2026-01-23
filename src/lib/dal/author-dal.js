import 'server-only'

import sql from '../config/db'
import { createAuthor } from '../models/author-model'
import { dataDeleted, dataNotDeleted } from '../utils/server/sql'
import { createBook } from '../models/book-model'

const tableName = 'authors'

//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const AuthorDAL = {
  findById: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    const authors = await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE
        id = ${id} AND
        ${ dataNotDeleted() }
    `
    return authors.length === 0 
      ? null
      : createAuthor({...authors[0]})
  },

  save: async ({
    id = null,
    fullName,
    countryCode,
    about,
    activeSince,
  }) => {
    activeSince = activeSince && parseInt(activeSince)

    if (activeSince !== null && activeSince < 0) {
      throw new Error('activeSince property cannot less than 0.')
    }

    let authors = []
    if (id === null) {
      authors = await sql`
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
    } else {
     authors = await sql`
        UPDATE ${ sql(tableName) } 
        SET 
          full_name = ${ fullName }, 
          country_code = ${ countryCode }, 
          active_since = ${ activeSince },
          about = ${ about }, 
          updated_by = ${ tempUsername }, 
          updated_at = NOW()
        WHERE
          id = ${id} AND
          ${ dataNotDeleted() }
        RETURNING *
      `
    }

    return authors.length === 0 
      ? null
      : createAuthor({...authors[0]})
  },

  delete: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    const authors = await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = ${ tempUsername }, 
        deleted = NOW()
      WHERE
        id = ${id} AND
        ${ dataNotDeleted() }
      RETURNING id
    `

    if (authors.length === 0) {
      throw new Error(`Failed to remove author, id: ${id}`)
    }
  },

  restore: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    const authors = await sql`
      UPDATE ${ sql(tableName) } 
      SET
        deleted_by = NULL, 
        deleted_at = NULL
      WHERE
        id = ${id} AND
        ${ dataDeleted() }
      RETURNING *
    `
    return authors.length === 0 
      ? null
      : createAuthor({...authors[0]})
  },

  getBooks: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')
    
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
        ba.author_id = ${id}
    `

    return books.map((book) => createBook({...book}))
  }
}

export default AuthorDAL


export {
  tableName
}