import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class MemberPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canCreate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_MEMBER, this.#session)
  }

  async canUpdate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_MEMBER, this.#session)
  }

  async canView() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_MEMBER, this.#session)
  } 

  async canViewTopTenLoanBook() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOP_TEN_LOAN_BOOK_MEM, this.#session)
  } 

  async canViewList() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_MEMBER, this.#session)
  }

  async canViewTotal() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_MEMBER, this.#session)
  }

  async canExportExcelListAll() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_MEMBER, this.#session)
  }
}

export default MemberPerm