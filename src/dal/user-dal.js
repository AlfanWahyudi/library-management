import 'server-only'


import sql from '@/lib/db'

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

  update: async ({ username, email, fullName, gender, address }) => {
    //TODO
  },
}

export default UserDAL
