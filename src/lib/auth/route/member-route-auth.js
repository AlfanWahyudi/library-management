import MemberPerm from "../permission/member-perm"
import routeHandlerAuth from "../route-handler"

const MemberRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateCreate()
          .exec()

        return memPerm.canCreate
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateUpdate()
          .exec()

        return memPerm.canUpdate
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateView()
          .exec()

        return memPerm.canView
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateViewList()
          .exec()

        return memPerm.canViewList
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateExportExcelListAll()
          .exec()

        return memPerm.canExportExcelListAll
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateViewListPage()
          .exec()

        return memPerm.canViewListPage
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateFindDup()
          .exec()

        return memPerm.canFindDup
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListSearchableInclLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = await MemberPerm.validation(session)
          .validateViewListSearchableInclLoan()
          .exec()

        return memPerm.canViewListSearchableInclLoan
      }
    })

    return userVerified.isValid
  },
}

export default MemberRouteAuth