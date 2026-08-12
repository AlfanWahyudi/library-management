import BookPerm from "../permission/book-perm"
import routeHandlerAuth from "../route-handler"

const BookRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canCreate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canUpdate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanDelete() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canDelete()
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canView()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canViewList()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canViewListPage()
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canFindDup()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListInclLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canViewListInclLoan()
      }
    })

    return userVerified.isValid
  },

  async verifyCanRestore() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.canRestore()
      }
    })

    return userVerified.isValid
  },

  async verifyDataCanDeleted() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const bookPerm = new BookPerm(session)
        return await bookPerm.verifyDataCanDeleted()
      }
    })

    return userVerified.isValid
  },
}

export default BookRouteAuth