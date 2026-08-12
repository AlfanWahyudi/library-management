import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class AuthorPerm {
  #session
  #createPromise
  #updatePromise
  #deletePromise
  #viewPromise
  #viewListPromise
  #exportExcelListAllPromise
  #viewListPagePromise
  #restorePromise
  #dataCanDeletedPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new AuthorPerm(session)
  }

  validateCreate() {
    this.#createPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_AUTHOR, this.#session)
    return this
  }

  validateUpdate() {
    this.#updatePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_AUTHOR, this.#session)
    return this
  }

  validateDelete() {
    this.#deletePromise =  Authorize.verifyPermissionBySession(USER_PERMISSION.DEL_AUTHOR, this.#session)
    return this
  }

  validateView() {
    this.#viewPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_AUTHOR, this.#session)
    return this
  } 

  validateViewList() {
    this.#viewListPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_AUTHOR, this.#session)
    return this
  }

  validateExportExcelListAll() {
    this.#exportExcelListAllPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_AUTHOR, this.#session)
    return this
  }

  validateViewListPage() {
    this.#viewListPagePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_AUTHOR, this.#session)
    return this
  }

  validateRestore() {
    this.#restorePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.RESTORE_AUTHOR, this.#session)
    return this
  }

  validateDataCanDeleted() {
    this.#dataCanDeletedPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VERIFY_CAN_DEL_DATA_AUTHOR, this.#session)
    return this
  }

  async exec() {
    const result = {}
    
    const [
      canCreate,
      canUpdate,
      canDelete,
      canView,
      canViewList,
      canExportExcelListAll,
      canViewListPage,
      canRestore,
      verifyDataCanDeleted
    ] = await Promise.all([
      this.#createPromise,
      this.#updatePromise,
      this.#deletePromise,
      this.#viewPromise,
      this.#viewListPromise,
      this.#exportExcelListAllPromise,
      this.#viewListPagePromise,
      this.#restorePromise,
      this.#dataCanDeletedPromise,
    ])

    if (canCreate !== undefined) {
      result.canCreate = canCreate
    }
    if (canUpdate !== undefined) {
      result.canUpdate = canUpdate
    }
    if (canDelete !== undefined) {
      result.canDelete = canDelete
    }
    if (canView !== undefined) {
      result.canView = canView
    }
    if (canViewList !== undefined) {
      result.canViewList = canViewList
    }
    if (canExportExcelListAll !== undefined) {
      result.canExportExcelListAll = canExportExcelListAll
    }
    if (canViewListPage !== undefined) {
      result.canViewListPage = canViewListPage
    }
    if (canRestore !== undefined) {
      result.canRestore = canRestore
    }
    if (verifyDataCanDeleted !== undefined) {
      result.verifyDataCanDeleted = verifyDataCanDeleted
    }

    return result
  }
}

export default AuthorPerm