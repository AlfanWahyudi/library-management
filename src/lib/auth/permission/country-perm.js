import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class CountryPerm {
  #session
  #viewListPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new CountryPerm(session)
  }

  validateViewList() {
    this.#viewListPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_COUNTRY, this.#session)
    return this
  }

  async exec() {
    const result = {}

    const [
      canViewList
    ] = await Promise.all([
      this.#viewListPromise
    ])

    if (canViewList !== undefined) {
      result.canViewList = canViewList
    }

    return result
  }
}

export default CountryPerm