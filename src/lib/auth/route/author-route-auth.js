import AuthorPerm from "../permission/author-perm"
import routeHandlerAuth from "../route-handler"

const AuthorRouteAuth = {
  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canViewList()
      }
    })

    return userVerified.isValid
  },

  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canCreate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canUpdate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanDelete() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canDelete()
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canView()
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canExportExcelListAll()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canViewListPage()
      }
    })

    return userVerified.isValid
  },

  async verifyCanRestore() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.canRestore()
      }
    })

    return userVerified.isValid
  },

  async verifyDataCanDeleted() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = new AuthorPerm(session)
        return await authorPerm.verifyDataCanDeleted()
      }
    })

    return userVerified.isValid
  },
}

export default AuthorRouteAuth