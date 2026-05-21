import 'server-only'

export const searchableListQuery = async (sql, tableName, data) => {
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

  return sql`
    SELECT * 
    FROM 
      ${ sql(tableName) }
    WHERE 
      CONCAT_WS(' ', ${sql(searchFields)}) ILIKE ${'%' + search + '%'}
    ORDER BY 
      ${sql(orderBy)} ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
  `
}

// TODO: pakai func ini ke semua DAL classes yang menggunakan findByQuery
export const findByQuery = async (sql, tableName, data) => {
  const { field, value } = data

  if (typeof(field) !== 'string') throw new Error ('field must be a string')

  if (!field && !value) throw new Error ('field and value must not be empty')

  return sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}