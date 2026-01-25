import 'server-only'

import { getPaginatedList } from '@/lib/utils/server/datatable'
import { VIOLATION_LEVEL } from '../constants/violation-level'
import { dataDeleted, dataNotDeleted } from '../utils/server/sql'

const tableName = 'violations'

//TODO: get curr user
const tempUsername = 'superadmin1' // 

const ViolationDAL = {
  findById: async (sql, violationId) => {
    if (typeof(violationId) !== 'number') throw new Error('violationId must be a number.')

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE 
        id = ${violationId} AND
        ${ dataNotDeleted() }
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
      levels: [],
    }
  ) => {
    const { levels = Object.keys(VIOLATION_LEVEL) } = data

    const filterLevels = sql`level in ${sql(levels)}`
    const paginatedData = {
      ...data,
      tableName,
      filterQueries: [filterLevels],
      isSoftDeleted: true,
    }

    return await getPaginatedList(sql, paginatedData)
  },

  create: async (sql, data) => {
    const {
      title,
      level,
      description,
    } = data

    return await sql`
      INSERT INTO ${ sql(tableName) }
        (title, level, description, created_by, created_at, updated_by, updated_at)
      VALUES
        (
          ${ title }, 
          ${ level }, 
          ${ description }, 
          ${ tempUsername },
          NOW(), 
          ${ tempUsername },
          NOW()
        )
      RETURNING *
    `
  },

  update: async (sql, data, violationId) => {
    const {
      title,
      level,
      description,
    } = data

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        title = ${ title }, 
        level = ${ level }, 
        description = ${ description }, 
        updated_by = ${ tempUsername }, 
        updated_at = NOW()
      WHERE
        id = ${violationId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },

  restore: async (sql, violationId) => {
    if (typeof(violationId) !== 'number') throw new Error('violationId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET
        deleted_by = NULL, 
        deleted_at = NULL
      WHERE
        id = ${violationId} AND
        ${ dataDeleted() }
      RETURNING *
    `
  },

  delete: async (sql, violationId) => {
    if (typeof(violationId) !== 'number') throw new Error('violationId must be a number.')

    return await sql`
      UPDATE ${ sql(tableName) } 
      SET 
        deleted_by = ${ tempUsername }, 
        deleted_at = NOW()
      WHERE
        id = ${violationId} AND
        ${ dataNotDeleted() }
      RETURNING *
    `
  },
}

export default ViolationDAL

export {
  tableName,
}