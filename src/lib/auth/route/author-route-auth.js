import AuthorPerm from "../permission/author-perm"
import routeHandlerAuth from "../route-handler"

const AuthorRouteAuth = {
  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateViewList()
          .exec()

        return authorPerm.canViewList
      }
    })

    return userVerified.isValid
  },

  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateCreate()
          .exec()

        return authorPerm.canCreate
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateUpdate()
          .exec()

        return authorPerm.canUpdate
      }
    })

    return userVerified.isValid
  },

  async verifyCanDelete() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateDelete()
          .exec()
          
        return authorPerm.canDelete
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateView()
          .exec()

        return authorPerm.canView
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateExportExcelListAll()
          .exec()

        return authorPerm.canExportExcelListAll
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateViewListPage()
          .exec()

        return authorPerm.canViewListPage
      }
    })

    return userVerified.isValid
  },

  async verifyCanRestore() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateRestore()
          .exec()

        return authorPerm.canRestore
      }
    })

    return userVerified.isValid
  },

  async verifyDataCanDeleted() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const authorPerm = await AuthorPerm.validation(session)
          .validateDataCanDeleted()
          .exec()

        return authorPerm.verifyDataCanDeleted
      }
    })

    return userVerified.isValid
  },
}

export default AuthorRouteAuth