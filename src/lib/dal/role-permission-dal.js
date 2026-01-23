import 'server-only'

const tblName = 'role_permissions'

const RolePermissionDAL = {
  getSpecificItems: async (sql, roleId, permissionName) => {
    const items = await sql`
      select 
        rp.role_id ,
        rp.permission_id,
        p.name as permission_name
      from role_permissions rp 
      join permissions p on p.id = rp.permission_id
      where rp.role_id = ${roleId} and p.name = ${permissionName}
    `

    return items
  }
}

export default RolePermissionDAL

export {
  tblName
}