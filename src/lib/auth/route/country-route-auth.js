import CountryPerm from "../permission/country-perm"
import routeHandlerAuth from "../route-handler"

const CountryRouteAuth = {
  async verifyCanViewList() {
    const userVerified = await routeHandlerAuth.verifyUser({
      cbCheckPermission: async (session) => {
        const perm = new CountryPerm(session)
        return await perm.canViewList()
      }
    })

    return userVerified.isValid
  },
}

export default CountryRouteAuth