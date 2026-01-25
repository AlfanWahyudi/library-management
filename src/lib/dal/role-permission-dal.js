import 'server-only'

const tblName = 'role_permissions'

const RolePermissionDAL = {
  getSpecificItems: async (sql, roleId, permissionName) => {
    return await sql`
      select 
        rp.role_id ,
        rp.permission_id,
        p.name as permission_name
      from role_permissions rp 
      join permissions p on p.id = rp.permission_id
      where rp.role_id = ${roleId} and p.name = ${permissionName}
    `
  }
}

export default RolePermissionDAL

export {
  tblName
}