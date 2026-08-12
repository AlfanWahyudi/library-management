import 'server-only'

import { tableName as tableRolePermission } from "./role-permission-dal"
import { tableName as tablePermission } from "./permission-dal"

const tableName = 'roles'

const RoleDAL = {
  findAllByPermission: async (sql, permissionName) => {
    return await sql`
      SELECT
        r.id,
        r.name,
        p.name as permission_name
      FROM
        ${ sql(tableName) } r
      LEFT JOIN ${ sql(tableRolePermission) } rp 
        ON rp.role_id = r.id
      LEFT JOIN ${ sql(tablePermission) } p 
        ON p.id = rp.permission_id
      WHERE
        p.name = ${permissionName};
    `
  }
}

export default RoleDAL

export {
  tableName
}