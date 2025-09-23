import 'server-only'
import { createAuthorDTO } from '../dto/author-dto'
import sql from '../config/db'
import { createAuthor } from '../models/author-model'

const tableName = 'authors'

const AuthorDAL = {
  findById: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    const authors = await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE id = ${id}
    `

    return authors.length === 0 
      ? null
      : createCountry({...authors[0]})
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

    //TODO: get curr user
    const tempUsername = 'superadmin1' // later change this

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
        WHERE id = ${id}
        RETURNING *
      `
    }

    return createAuthor({...authors[0]})
  },

  sofDelete: () => {
    //TODO
  },

  forceDelete: () => {
    //TODO
  },

}

export default AuthorDAL


export {
  tableName
}