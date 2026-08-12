import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class BookPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canCreate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_BOOK, this.#session)
  }

  async canUpdate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_BOOK, this.#session)
  }

  async canDelete() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.DEL_BOOK, this.#session)
  }

  async canView() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_BOOK, this.#session)
  } 

  async canViewTopTenLoanedBook() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOP_TEN_LOANED_BOOK, this.#session)
  } 

  async canViewList() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_BOOK, this.#session)
  }

  async canViewTotalBook() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_BOOK, this.#session)
  }
}

export default BookPerm