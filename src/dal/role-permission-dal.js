import 'server-only'

import sql from '@/db'
import { tblName as permissionTblName } from './permission-dal'

const tblName = 'role_permissions'

const RolePermissionDAL = {
  checkPermission: async ({ roleCode, resourceCode, operationCode }) => {
    const data = await sql`
      select 
        *
      from ${tblName} rp
      join ${permissionTblName} p on rp.permission_id = p.id
      where rp.role_code = ${roleCode} and p.resource_code = ${resourceCode} and p.operation_code = ${operationCode}
    `
    return data.length > 0
  }
}

export default RolePermissionDAL

export {
  tblName
}