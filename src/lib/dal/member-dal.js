import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { createMember } from '../models/member-model'
import { tableName as tableBookLoan } from './book-loan-dal'

const tableName = 'members'

//TODO: get curr user
const tempUserId = '1' // 

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
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

  getAllForExcel: async (sql) => {
    return await sql`
      select * from ${ sql(tableName) }
      order by updated_at desc
    `
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
          ${ tempUserId },
          NOW(), 
          ${ tempUserId },
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
        updated_by = ${ tempUserId }, 
        updated_at = NOW()
      WHERE
        id = ${memberId} 
      RETURNING *
    `
  },

  searchableIncludeLoanList: async (sql, data) => {
    const {
      orderBy,
      orderDir,
      search,
      searchFields,
    } = data

    if (typeof(orderBy) !== 'string') throw new Error ('orderBy must be a string')
    if (typeof(orderDir) !== 'string') throw new Error ('orderDir must be a string')
    if (typeof(search) !== 'string') throw new Error ('search must be a string')
    if (!Array.isArray(searchFields)) throw new Error ('searchFields must be an array')

    if (searchFields.length === 0) {
      throw new Error('searchFields must not be empty')
    }

    return await sql`
      SELECT 
      	m.id,
        m.full_name,
        m.email,
        m.phone,
        m.address,
        m.birth_date,
        m.gender,
        m.created_at,
        m.updated_at,
        (
          SELECT count(id) FROM ${ sql(tableBookLoan) } bl WHERE bl.member_id = m.id AND bl.finished_date IS NULL
        ) AS book_on_loan_count
      FROM 
        ${ sql(tableName) } AS m
      WHERE 
        CONCAT_WS(' ', ${sql(searchFields.map((field) => `m.${field}`))}) ILIKE ${'%' + search + '%'}
      ORDER BY 
        m.${sql(orderBy)} ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
    `
  },
}

export default MemberDAL

export {
  tableName,
}