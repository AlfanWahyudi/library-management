import { MESSAGE } from "../constants/message"
import SessionDAL from "../dal/session-dal"
import { UnauthorizeError } from "../errors/unauthorized-error"


class Auth {
  #session

  constructor(session) {
    this.#session = session
  }

  static async validateSession(errMessage = MESSAGE.UNAUTHORIZE_DEFAULT_ERR) {
    const session = await SessionDAL.verify()

    if (!session.isAuth) {
      throw new UnauthorizeError(errMessage)
    }

    return new Auth(session)
  }

  getSession() {
    return this.#session
  }
}


export default Auth