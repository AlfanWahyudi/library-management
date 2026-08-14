import 'server-only'

import { dataNotDeleted } from '../utils/server/sql'

const tableName = 'users'

const UserDAL = {
  getById: async (sql, userId) => {
    return await sql`
      select 
        * 
      from users
      WHERE
        id = ${userId} AND
        ${ dataNotDeleted() }
    `
  },

  getByUsername: async (sql, username) => {
    return await sql`
      select 
        * 
      from users
      WHERE
        username = ${username} AND
        ${ dataNotDeleted() }
    `
  },

  getRoles: async (sql, userId) => {
    return await sql`
      select 
        r.id,
        r.name,
        r.created_at,
        r.updated_at,
        r.created_by,
        r.updated_by
      from user_roles ur 
      join users u ON ur.user_id = u.id
      join roles r ON ur.role_id = r.id 
      where 
        ur.user_id = ${userId} AND
        ${ dataNotDeleted('u') }
    `
  },

  updateProfile: async (
    sql, 
    data,
    currUserId
  ) => {
    const { username, email, fullName, gender, address } = data

    if (username === null || username === '') throw new Error('username must not be null or empty')

    return await sql`
      UPDATE ${ sql(tableName) }
      SET
        full_name = ${ fullName },
        email = ${ email },
        gender = ${ gender },
        address = ${ address },
        updated_by = ${ currUserId }, 
        updated_at = NOW()
      WHERE
        username = ${username} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },

  checkEmailExist: async (sql, userId, email) => {
    if (userId === null) throw new Error('userId must not be null')
    if (email === null) throw new Error('email must not be null')

    return await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        email = ${email} AND
        id != ${userId} AND
        ${ dataNotDeleted() }
    `
  },

  checkUsernameExist: async (sql, userId, username) => {
    if (userId === null) throw new Error('userId must not be null')
    if (username === null) throw new Error('username must not be null')

    return await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        username = ${username} AND
        id != ${userId} AND
        ${ dataNotDeleted() }
    `
  },

  changeUsername: async (sql, userId, newUsername) => {
    if (userId === null) throw new Error('userId must not be null')
    if (newUsername === null) throw new Error('newUsername must not be null')

    return await sql`
      UPDATE ${ sql(tableName) }
      SET
        username = ${newUsername},
        updated_by = ${ userId },
        updated_at = NOW()
      WHERE
        id = ${userId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },
}

export default UserDAL

export {
  tableName
}
