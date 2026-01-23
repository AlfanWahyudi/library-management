import 'server-only'

import SessionDAL from '@/lib/dal/session-dal'
import RolePermissionService from '@/lib/services/role-permission-service'

const isUserAllowed = async ({ name }) => {
    const result = {
      success: false,
      message: `Sorry, you don’t have permission to access this feature.`
    }

    const session = await SessionDAL.verify()
    if (session.isAuth) {
      const hasPermission = await RolePermissionService.hasAccess({
        roleId: session.role.code,
        name
      })

      if (hasPermission) {
        result.success = true
        result.message = `You have the necessary permissions to access this feature.`
      }
    }

    return result
  }

export {
  isUserAllowed
}