import UserPerm from "../permission/user-perm"
import routeHandlerAuth from "../route-handler"

const UserRouteAuth = {
  async verifyCanUpdateOwnUsername() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = new UserPerm(session)
        return await usrPerm.canUpdateOwnUsername()
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdateOwnUser() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = new UserPerm(session)
        return await usrPerm.canUpdateOwnUser()
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const usrPerm = new UserPerm(session)
        return await usrPerm.canFindDup()
      }
    })

    return userVerified.isValid
  },

}

export default UserRouteAuth