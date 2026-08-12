import 'server-only'

const tableName = 'permissions'

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const PermissionDAL = {
  findById: async (sql, permissionId) => {
    if (typeof(permissionId) !== 'number') throw new Error('permissionId must be a number.')

    return await findByQuery({ sql, field: 'id', value: permissionId })
  },

  findByName: async (sql, permissionName) => {
    if (typeof(permissionName) !== 'string') throw new Error('permissionName must be a string.')

    return await findByQuery({ sql, field: 'name', value: permissionName })
  }
}

export default PermissionDAL

export {
  tableName
}