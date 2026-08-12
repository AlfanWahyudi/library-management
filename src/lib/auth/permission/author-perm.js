import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class AuthorPerm {
  #session

  constructor(session) {
    this.#session = session
  }

  async canCreate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_AUTHOR, this.#session)
  }

  async canUpdate() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_AUTHOR, this.#session)
  }

  async canDelete() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.DEL_AUTHOR, this.#session)
  }

  async canView() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_AUTHOR, this.#session)
  } 

  async canViewList() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_AUTHOR, this.#session)
  }

  async canExportExcelListAll() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_AUTHOR, this.#session)
  }

  async canViewListPage() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_AUTHOR, this.#session)
  }

  async canRestore() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.RESTORE_AUTHOR, this.#session)
  }

  async verifyDataCanDeleted() {
    return await Authorize.verifyPermissionBySession(USER_PERMISSION.VERIFY_CAN_DEL_DATA_AUTHOR)
  }

}

export default AuthorPerm