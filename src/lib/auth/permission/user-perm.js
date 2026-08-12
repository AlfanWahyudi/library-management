import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class UserPerm {
  #session
  #viewOwnUserPromise
  #updateOwnUsernamePromise
  #updateOwnUserPromise
  #findDupPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new UserPerm(session)
  }

  validateViewOwnUser() {
    this.#viewOwnUserPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_OWN_USER, this.#session)
    return this
  }

  validateUpdateOwnUsername() {
    this.#updateOwnUsernamePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_OWN_USERNAME, this.#session)
    return this
  }

  validateUpdateOwnUser() {
    this.#updateOwnUserPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_OWN_USER, this.#session)
    return this
  }

  validateFindDup() {
    this.#findDupPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.FIND_DUP_USER, this.#session)
    return this
  }

  async exec() {
    const result = {}

    const [
      canViewOwnUser,
      canUpdateOwnUsername,
      canUpdateOwnUser,
      canFindDup,
    ] = await Promise.all([
      this.#viewOwnUserPromise,
      this.#updateOwnUsernamePromise,
      this.#updateOwnUserPromise,
      this.#findDupPromise,
    ])

    if (canViewOwnUser !== undefined) {
      result.canViewOwnUser = canViewOwnUser
    }
    if (canUpdateOwnUsername !== undefined) {
      result.canUpdateOwnUsername = canUpdateOwnUsername
    }
    if (canUpdateOwnUser !== undefined) {
      result.canUpdateOwnUser = canUpdateOwnUser
    }
    if (canFindDup !== undefined) {
      result.canFindDup = canFindDup
    }

    return result
  }

}

export default UserPerm