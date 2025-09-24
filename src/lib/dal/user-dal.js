import 'server-only'

import sql from '@/lib/config/db'
import { dataDeleted, dataNotDeleted } from '../utils/sql-utils'

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
      : users[0]
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
      : users[0]
  },

  //TODO: Test this function
  getRoles: async ({ id }) => {
    return await sql`
      select 
        r.id,
        r.name
      from user_roles ur 
      join user u ON ur.user_id = u.id
      join roles r ON ur.role_id = r.id 
      where 
        ur.user_id = ${id} AND
        ${ dataNotDeleted('u') }
    `
  },

  update: async ({ username, email, fullName, gender, address }) => {
    //TODO
  },
}

export default UserDAL
