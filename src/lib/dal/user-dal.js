import 'server-only'

import sql from '@/lib/config/db'
import { dataDeleted, dataNotDeleted } from '../utils/sql-utils'
import { createUser } from '../models/user-model'
import { sq } from 'date-fns/locale'

const tableName = 'users'

//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const UserDAL = {
  getById: async (id) => {
    const users = await sql`
      select 
        * 
      from users
      WHERE
        id = ${id} AND
        ${ dataNotDeleted() }
    `

    return users.length === 0
      ? null
      : createUser(users[0]) 
  },

  getByUsername: async (username) => {
    const users = await sql`
      select 
        * 
      from users
      WHERE
        username = ${username} AND
        ${ dataNotDeleted() }
    `
    return users.length === 0
      ? null
      : createUser(users[0])
  },

  getRoles: async ({ id }) => {
    return await sql`
      select 
        r.id,
        r.name
      from user_roles ur 
      join users u ON ur.user_id = u.id
      join roles r ON ur.role_id = r.id 
      where 
        ur.user_id = ${id} AND
        ${ dataNotDeleted('u') }
    `
  },

  updateProfile: async ({ username, email, fullName, gender, address }) => {
    if (username === null || username === '') throw new Error('username must not be null or empty')

    const users = await sql`
      UPDATE ${ sql(tableName) }
      SET
        full_name = ${ fullName },
        email = ${ email },
        gender = ${ gender },
        address = ${ address },
        updated_by = ${ tempUsername }, 
        updated_at = NOW()
      WHERE
        username = ${username} AND
        ${ dataNotDeleted() }
      RETURNING *
    `

    return users.length === 0
      ? null
      : createUser({...users[0]})
  },

  checkEmailExist: async ({id, email}) => {
    if (id === null) throw new Error('id must not be null')
    if (email === null) throw new Error('email must not be null')

    const users = await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        email = ${email} AND
        id != ${id} AND
        ${ dataNotDeleted() }
    `

    return users.length > 0
  },

  checkUsernameExist: async ({ id, username }) => {
    if (id === null) throw new Error('id must not be null')
    if (username === null) throw new Error('username must not be null')

    const users = await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        username = ${username} AND
        id != ${id} AND
        ${ dataNotDeleted() }
    `

    return users.length > 0
  }
}

export default UserDAL

export {
  tableName
}
