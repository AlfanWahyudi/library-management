import BookLoanPerm from "../permission/book-loan-perm"
import routeHandlerAuth from "../route-handler"

const BookLoanRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canCreate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canView()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewHistory() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canViewHistory()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canViewList()
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canExportExcelListAll()
      }
    })

    return userVerified.isValid
  },

  async verifyCanCompleteLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canCompleteLoan()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canViewListPage()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPageHistory() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = new BookLoanPerm(session)
        return await blPerm.canViewListPageHistory()
      }
    })

    return userVerified.isValid
  },
}

export default BookLoanRouteAuth