import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { createMember } from '../models/member-model'

const tableName = 'members'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const findByQuery = async ({ sql, field, value }) => {
  const [data] = await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `

  return data
}

const mapResult = (member) => {
  return member
    ? createMember(member)
    : null
}

const MemberDAL = {
  findById: async (sql, memberId) => {
    if (typeof(memberId) !== 'number') throw new Error('memberId must be a number.')

    const member = await findByQuery({ sql, field: 'id', value: memberId })
    return mapResult(member)
  },

  findByEmail: async (sql, email) => {
    if (typeof(email) !== 'string') throw new Error('email must be a string.')

    const member = await findByQuery({ sql, field: 'email', value: email })
    return mapResult(member)
  },

  findByPhone: async(sql, phone) => {
    if (typeof(phone) !== 'string') throw new Error('phone must be a string.')

    const member = await findByQuery({ sql, field: 'phone', value: phone })
    return mapResult(member)
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

    const paginatedItems = await getPaginatedList(sql, paginatedData)

    paginatedItems.data = paginatedItems.data.map((item) => createMember({...item}))

    return paginatedItems
  },

  save: async (
    sql,
    data,
    memberId = null
) => {
  const {
    fullName,
    email,
    phone,
    address,
    birthDate,
    gender
  } = data

    let result = null

    if (memberId === null) {
      const [member] = await sql`
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

      result = member
    } else {
     const [member] = await sql`
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

      result = member
    }

    return mapResult(result)
  },

}

export default MemberDAL

export {
  tableName,
}