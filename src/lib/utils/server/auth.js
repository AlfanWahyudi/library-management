import "server-only"

import { MESSAGE } from "../../constants/message"
import SessionDAL from "../../dal/session-dal"
import { UnauthorizeError } from "../../errors/unauthorized-error"


const checkUserAlreadyLoggedIn = async (message = MESSAGE.UNAUTHORIZE_ROUTE_ERR) => {
  const session = await SessionDAL.verify()
  if (!session.isAuth) {
    throw new UnauthorizeError(message)
  }
}

export {
  checkUserAlreadyLoggedIn,
}

