import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class UserPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canViewOwnUser() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_OWN_USER, this.#session)
  }

  async canUpdateOwnUsername() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_OWN_USERNAME, this.#session)

  }

  async canUpdateOwnUser() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_OWN_USER, this.#session)
  }

}

export default UserPerm