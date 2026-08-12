import BookLoanPerm from "../permission/book-loan-perm"
import routeHandlerAuth from "../route-handler"

const BookLoanRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateCreate()
          .exec()

        return blPerm.canCreate
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateView()
          .exec()

        return blPerm.canView
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateViewList()
          .exec()

        return blPerm.canViewList
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateExportExcelListAll()
          .exec()

        return blPerm.canExportExcelListAll
      }
    })

    return userVerified.isValid
  },

  async verifyCanCompleteLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateCompleteLoan()
          .exec()

        return blPerm.canCompleteLoan
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateViewListPage()
          .exec()

        return blPerm.canViewListPage
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPageHistory() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const blPerm = await BookLoanPerm.validation(session)
          .validateViewListPageHistory()
          .exec()

        return blPerm.canViewListPageHistory
      }
    })

    return userVerified.isValid
  },
}

export default BookLoanRouteAuth