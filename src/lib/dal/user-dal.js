import 'server-only'

import sql from '@/lib/config/db'
import { dataDeleted, dataNotDeleted } from '../utils/server/sql'
import { createUser } from '../models/user-model'
import { sq } from 'date-fns/locale'

const tableName = 'users'

//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const mapResult = (user) => {
  return user
    ? createUser(user)
    : null
}

const UserDAL = {
  getById: async (sql, roleId) => {
    const [user] = await sql`
      select 
        * 
      from users
      WHERE
        id = ${roleId} AND
        ${ dataNotDeleted() }
    `

    return mapResult(user)
  },

  getByUsername: async (sql, username) => {
    const [user] = await sql`
      select 
        * 
      from users
      WHERE
        username = ${username} AND
        ${ dataNotDeleted() }
    `
    return mapResult(user)
  },

  getRoles: async (sql, userId) => {
    return await sql`
      select 
        r.id,
        r.name
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
    data = { 
      username: '', 
      email: '', 
      fullName: '', 
      gender: '', 
      address: '' 
    }
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
        updated_by = ${ tempUsername }, 
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

    const [user] = await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        email = ${email} AND
        id != ${userId} AND
        ${ dataNotDeleted() }
    `

    return mapResult(user)
  },

  checkUsernameExist: async (sql, userId, username) => {
    if (userId === null) throw new Error('userId must not be null')
    if (username === null) throw new Error('username must not be null')

    const [user] = await sql`
      SELECT 
        * 
      FROM 
        ${ sql(tableName) }
      WHERE
        username = ${username} AND
        id != ${userId} AND
        ${ dataNotDeleted() }
    `

    return mapResult(user)
  },

  changeUsername: async (sql, userId, newUsername) => {
    if (userId === null) throw new Error('userId must not be null')
    if (newUsername === null) throw new Error('newUsername must not be null')

    return await sql`
      UPDATE ${ sql(tableName) }
      SET
        username = ${newUsername}
      WHERE
        id = ${userId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  }
}

export default UserDAL

export {
  tableName
}
