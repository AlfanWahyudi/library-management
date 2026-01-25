import 'server-only'

import { dataDeleted, dataNotDeleted } from '../utils/server/sql'

const tableName = 'authors'

//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const AuthorDAL = {
  findById: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE
        id = ${authorId} AND
        ${ dataNotDeleted() }
    `
  },

  create: async (sql, data) => {
    const { fullName, countryCode, about, activeSince } = data
    
    if (activeSince !== null && parseInt(activeSince) < 0) {
      throw new Error('activeSince property cannot less than 0.')
    }
    
    return await sql`
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
  },

  update: async (sql, data, authorId) => {
    const { fullName, countryCode, about, activeSince } = data
    
    if (activeSince !== null && parseInt(activeSince) < 0) {
      throw new Error('activeSince property cannot less than 0.')
    }

    return await sql`
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
  },

  delete: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = ${ tempUsername }, 
        deleted_at = NOW()
      WHERE
        id = ${authorId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },

  restore: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('authorId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET
        deleted_by = NULL, 
        deleted_at = NULL
      WHERE
        id = ${authorId} AND
        ${ dataDeleted() }
      RETURNING *
    `
  },

  getBooks: async (sql, authorId) => {
    if (typeof(authorId) !== 'number') throw new Error('id must be a number.')
    
    return await sql`
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
  }
}

export default AuthorDAL


export {
  tableName
}