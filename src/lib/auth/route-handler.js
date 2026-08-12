import { MESSAGE } from "../constants/message"
import { ForbiddenError } from "../errors/forbidden-error"
import Auth from "./auth"

const routeHandlerAuth = {
  isValid: false,

  async verifySession(errUnauthorizeMsg = MESSAGE.UNAUTHORIZE_ROUTE_ERR) {
    const auth = await Auth.validateSession(errUnauthorizeMsg)
    return auth.getSession()
  },

  async verifyUser({
    cbCheckPermission = async (session) => false, 
    errUnauthorizeMsg = MESSAGE.UNAUTHORIZE_ROUTE_ERR, 
    errForbiddenMsg = MESSAGE.FORBIDDEN_ROUTE_ERR
  }) {
    const session = await this.verifySession(errUnauthorizeMsg)

    const hasPermission = await cbCheckPermission(session)
    if (!hasPermission) {
      throw new ForbiddenError(errForbiddenMsg)
    }

    this.isValid = true

    return this
  },
}

export default routeHandlerAuth