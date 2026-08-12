import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class BookLoanPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canCreate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_BOOK_LOAN, this.#session)
  }

  async canView() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_BOOK_LOAN, this.#session)
  } 

  async canViewTotal() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_BOOK_LOAN, this.#session)
  } 

  async canViewHistory() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_HISTORY_BOOK_LOAN, this.#session)
  } 

  async canViewList() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_BOOK_LOAN, this.#session)
  }

  async canExportExcelListAll() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_HISTORY_BOOK_LOAN, this.#session)
  }

  async canCompleteLoan() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.CMP_BOOK_LOAN, this.#session)
  }
} 

export default BookLoanPerm