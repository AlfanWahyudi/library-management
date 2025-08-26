import 'server-only'

import sql from '@/lib/db'
import { tblName as permissionTblName } from './permission-dal'

const tblName = 'role_permissions'

const RolePermissionDAL = {
  hasAccess: async ({ roleId, permissionName }) => {
    const data = await sql`
      select 
        rp.role_id ,
        rp.permission_id,
        p.name as permission_name
      from role_permissions rp 
      join permissions p on p.id = rp.permission_id
      where rp.role_id = ${roleId} and p.name = ${permissionName}
    `
    return data.length > 0
  }
}

export default RolePermissionDAL

export {
  tblName
}