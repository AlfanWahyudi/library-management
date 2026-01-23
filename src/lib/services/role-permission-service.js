import sql from "../config/db"
import RolePermissionDAL from "../dal/role-permission-dal"

const RolePermissionService = {
  hasAccess: async ({ roleId, name }) => {
    const items = await RolePermissionDAL.getSpecificItems(sql, roleId, name)

    return items.length > 0
  },

}

export default RolePermissionService