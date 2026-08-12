import UserPerm from "../permission/user-perm"
import routeHandlerAuth from "../route-handler"

const UserRouteAuth = {
  async verifyCanUpdateOwnUsername() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = await UserPerm.validation(session)
          .validateUpdateOwnUsername()
          .exec()

        return usrPerm.canUpdateOwnUsername
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdateOwnUser() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = await UserPerm.validation(session)
          .validateUpdateOwnUser()
          .exec()

        return usrPerm.canUpdateOwnUser
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = await UserPerm.validation(session)
          .validateFindDup()
          .exec()

        return usrPerm.canFindDup
      }
    })

    return userVerified.isValid
  },

}

export default UserRouteAuth