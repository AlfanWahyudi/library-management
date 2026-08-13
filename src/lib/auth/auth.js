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

  getUserId() {
    return this.#session ? this.#session.userId : null
  }

  getFullName() {
    return this.#session ? this.#session.fullName : null
  }

  getRoles() {
    return this.#session ? this.#session.roles : null
  }

  getIsSuperAdmin() {
    return this.#session ? this.#session.isSuperAdmin : null
  }

  getIsPustakawan() {
    return this.#session ? this.#session.isPustakawan : null
  }

  getIsViewer() {
    return this.#session ? this.#session.isViewer : null
  }

  getExpiresAt() {
    return this.#session ? this.#session.expiresAt : null
  }
}


export default Auth