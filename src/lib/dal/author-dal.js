import 'server-only'
import { createAuthorDTO } from '../dto/author-dto'
import sql from '../config/db'
import { createAuthor } from '../models/author-model'

const tableName = 'authors'

const AuthorDAL = {
  getById: ({ id }) => {
    //TODO
  },

  create: async ({
    fullName,
    countryCode,
    about,
    activeSince,
  }) => {
    activeSince = activeSince && parseInt(activeSince)

    if (activeSince !== null && activeSince <= 0) {
      throw new Error('activeSince property cannot less than equal to 0.')
    }

    //TODO: get curr user
    const tempUsername = 'superadmin1' // later change this

    const authors = await sql`
      INSERT INTO ${ sql(tableName) }
        (full_name, country_code, active_since, about, created_by, updated_by)
      VALUES
        (${ fullName }, ${ countryCode }, ${ activeSince }, ${ about }, ${ tempUsername }, ${ tempUsername })
      RETURNING *
    `

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