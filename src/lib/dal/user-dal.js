import 'server-only'

import sql from '@/lib/config/db'

const UserDAL = {
  getById: async (id) => {
    const users = await sql`
      select 
        * 
      from users
      where id = ${id}
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
      where username = ${username}
    `
    return users.length === 0
      ? null
      : users[0]
  },

  getRoles: async ({ id }) => {
    return await sql`
      select 
        r.id,
        r.name
      from user_roles ur 
      join roles r ON ur.role_id = r.id 
      where ur.user_id = ${id}
    `
  },

  update: async ({ username, email, fullName, gender, address }) => {
    //TODO
  },
}

export default UserDAL
