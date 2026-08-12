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

  async canViewListPage() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_BOOK)
  }

  async canFindDup() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.FIND_DUP_BOOK)
  }

  async canViewListInclLoan() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_INCL_LOAN_BOOK)
  }

  async canRestore() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.RESTORE_BOOK)
  }

  async verifyDataCanDeleted() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VERIFY_CAN_DEL_DATA_BOOK)
  }
}

export default BookPerm