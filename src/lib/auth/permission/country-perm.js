import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class CountryPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canViewList() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_COUNTRY, this.#session)
  }
}

export default CountryPerm