import BookPerm from "../permission/book-perm"
import routeHandlerAuth from "../route-handler"

const BookRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateCreate()
          .exec()

        return bookPerm.canCreate
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateUpdate()
          .exec()
          
        return bookPerm.canUpdate
      }
    })

    return userVerified.isValid
  },

  async verifyCanDelete() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateDelete()
          .exec()
          
        return bookPerm.canDelete
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateView()
          .exec()
          
        return bookPerm.canView
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateViewList()
          .exec()
          
        return bookPerm.canViewList
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateViewListPage()
          .exec()
          
        return bookPerm.canViewListPage
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateFindDup()
          .exec()
          
        return bookPerm.canFindDup
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListInclLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateViewListInclLoan()
          .exec()
          
        return bookPerm.canViewListInclLoan
      }
    })

    return userVerified.isValid
  },

  async verifyCanRestore() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateRestore()
          .exec()
          
        return bookPerm.canRestore
      }
    })

    return userVerified.isValid
  },

  async verifyDataCanDeleted() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = await BookPerm.validation(session)
          .validateDataCanDeleted()
          .exec()
          
        return bookPerm.verifyDataCanDeleted
      }
    })

    return userVerified.isValid
  },
}

export default BookRouteAuth