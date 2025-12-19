import 'server-only'

import sql from '../config/db'
import { getPaginatedList } from '@/lib/utils/datatable'
import { createMember } from '../models/member-model'
import { dataNotDeleted } from '../utils/sql-utils'

const tableName = 'members'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const findByQuery = async ({ field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE
      ${ sql(field) } = ${value} AND
      ${ dataNotDeleted() }
  `
}

const mapResult = ({ members }) => {
  return members.length === 0 
    ? null
    : createMember({...members[0]})
}

const MemberDAL = {
  findById: async ({ id }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number.')

    const members = await findByQuery({ field: 'id', value: id })
    return mapResult({ members })
  },

  findByEmail: async ({ email }) => {
    if (typeof(email) !== 'string') throw new Error('email must be a string.')

    const members = await findByQuery({ field: 'email', value: email })
    return mapResult({ members })
  },

  findByPhone: async({ phone }) => {
    if (typeof(phone) !== 'string') throw new Error('phone must be a string.')

    const members = await findByQuery({ field: 'phone', value: phone })
    return mapResult({ members })
  },

  getAllPaginated: async ({ 
    page = 0, 
    limit = 10, 
    orderBy = 'updated_at',
    orderDir = 'desc',
    search = '',
    searchFields = [],
    gender = 'all',
  }) => {
    const filterQueries = []

    if (gender !== 'all') {
      filterQueries.push(sql`${sql('gender')} = ${gender}`)
    }

    const paginatedItems = await getPaginatedList({
      page,
      limit,
      orderBy,
      orderDir,
      search,
      searchFields,
      tableName,
      filterQueries
    })

    paginatedItems.data = paginatedItems.data.map((item) => createMember({...item}))

    return paginatedItems
  },

  save: async ({
    id = null,
    fullName,
    email,
    phone,
    address,
    birthDate,
    gender
  }) => {

    let members = [] 

    if (id === null) {
      members = await sql`
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
    } else {
     members = await sql`
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
          id = ${id} AND
          ${ dataNotDeleted() }
        RETURNING *
      `
    }

    return mapResult({ members })
  },

}

export default MemberDAL

export {
  tableName,
}