import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'

const tableName = 'violations'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const ViolationDAL = {
  findById: async (sql, violationId) => {
    if (typeof(violationId) !== 'number') throw new Error('violationId must be a number.')

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE id = ${violationId}
    `
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
    }
  ) => {

    const paginatedData = {
      ...data,
      tableName,
    }

    return await getPaginatedList(sql, paginatedData)
  },

  //TODO
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

  //TODO
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

  restore: async (sql, violationId) => {
    //TODO
  },

  delete: async (sql, violationId) => {
    //TODO
  },
}

export default ViolationDAL

export {
  tableName,
}