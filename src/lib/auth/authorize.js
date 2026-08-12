import sql from "../config/db"
import RoleDAL from "../dal/role-dal"

const getSelectedRoles = async (permissionName) => {
  const data = await RoleDAL.findAllByPermission(sql, permissionName)

  if (data.length == 0) {
    throw new Error("roles is not found, please re-check on database. Permission data must be assign to the role.")
  }

  return data
}

const mapUserRolesBySession = (rolesByPermission, session) => {
  const { roles: userRoles = [] } = session

  const rolesByPermissionIds = rolesByPermission.map((role) => parseInt(role.id))
  return userRoles.map((role) => ({
    ...role,
    hasAccess: rolesByPermissionIds.includes(parseInt(role.id))
  }))
}

const Authorize = {
  async verifyPermissionBySession(permissionName, session) {
    const rolesByPermission = await getSelectedRoles(permissionName)
    const userRoleWithAccessItems = mapUserRolesBySession(rolesByPermission, session)

    return userRoleWithAccessItems
      .map(item => item.hasAccess)
      .includes(true)
  }
}

export default Authorize