import { MESSAGE } from "../constants/message"
import { ForbiddenError } from "../errors/forbidden-error"
import Auth from "./auth"

const routeHandlerAuth = {
  isValid: false,

  async verifySession(errUnauthorize = MESSAGE.UNAUTHORIZE_ROUTE_ERR) {
    const auth = await Auth.validateSession(errUnauthorize)
    return auth.getSession()
  },

  async verifyUser({
    cbCheckPermission = async (session) => false, 
    errUnauthorize = MESSAGE.UNAUTHORIZE_ROUTE_ERR, 
    errForbidden = MESSAGE.FORBIDDEN_ROUTE_ERR
  }) {
    const session = await this.verifySession(errUnauthorize)

    const hasPermission = await cbCheckPermission(session)
    if (!hasPermission) {
      throw new ForbiddenError(errForbidden)
    }

    this.isValid = true

    return this
  },
}

export default routeHandlerAuth