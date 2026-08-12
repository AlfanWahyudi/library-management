import MemberPerm from "../permission/member-perm"
import routeHandlerAuth from "../route-handler"

const MemberRouteAuth = {
  async verifyCanCreate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canCreate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanUpdate() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canUpdate()
      }
    })

    return userVerified.isValid
  },

  async verifyCanView() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canView()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canViewList()
      }
    })

    return userVerified.isValid
  },

  async verifyCanExportExcelListAll() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canExportExcelListAll()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListPage() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canViewListPage()
      }
    })

    return userVerified.isValid
  },

  async verifyCanFindDup() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canFindDup()
      }
    })

    return userVerified.isValid
  },

  async verifyCanViewListSearchableInclLoan() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const memPerm = new MemberPerm(session)
        return await memPerm.canViewListSearchableInclLoan()
      }
    })

    return userVerified.isValid
  },
}

export default MemberRouteAuth