import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { createMember } from '../models/member-model'

const tableName = 'members'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const mapResult = (member) => {
  return member
    ? createMember(member)
    : null
}

const MemberDAL = {
  findById: async (sql, memberId) => {
    if (typeof(memberId) !== 'number') throw new Error('memberId must be a number.')

    return await findByQuery({ sql, field: 'id', value: memberId })
  },

  findByEmail: async (sql, email) => {
    if (typeof(email) !== 'string') throw new Error('email must be a string.')

    return await findByQuery({ sql, field: 'email', value: email })
  },

  findByPhone: async(sql, phone) => {
    if (typeof(phone) !== 'string') throw new Error('phone must be a string.')

    return await findByQuery({ sql, field: 'phone', value: phone })
  },

  getAllPaginated: async (
    sql,
    data = { 
      page: 0, 
      limit: 0, 
      orderBy: '',
      orderDir: '',
      search: '',
      searchFields: [],
      gender: 'all',
    }
  ) => {
    const { gender } = data

    const filterQueries = []

    if (gender !== 'all') {
      filterQueries.push(sql`${sql('gender')} = ${gender}`)
    }

    const paginatedData = {
      ...data,
      tableName,
      filterQueries  
    }

    return await getPaginatedList(sql, paginatedData)
  },

  create: async (sql, data) => {
    const {
      fullName,
      email,
      phone,
      address,
      birthDate,
      gender
    } = data

    return await sql`
      INSERT INTO ${ sql(tableName) }
        (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at)
      VALUES
        (
          ${ fullName }, 
          ${ email }, 
          ${ phone }, 
          ${ address }, 
          ${ birthDate }, 
          ${ gender }, 
          ${ tempUsername },
          NOW(), 
          ${ tempUsername },
          NOW()
        )
      RETURNING *
    `
  },

  update: async (sql, data, memberId) => {
    const {
      fullName,
      email,
      phone,
      address,
      birthDate,
      gender
    } = data

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        full_name = ${ fullName }, 
        email = ${ email }, 
        phone = ${ phone }, 
        address = ${ address }, 
        birth_date = ${ birthDate }, 
        gender = ${ gender }, 
        updated_by = ${ tempUsername }, 
        updated_at = NOW()
      WHERE
        id = ${memberId} 
      RETURNING *
    `
  },
}

export default MemberDAL

export {
  tableName,
}