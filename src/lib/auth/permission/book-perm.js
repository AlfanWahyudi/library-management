import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class BookPerm {
  #session
  #createPromise
  #updatePromise
  #deletePromise
  #viewPromise
  #viewListPromise
  #viewListPagePromise
  #restorePromise
  #dataCanDeletedPromise
  #viewTopTenLoanedBookPromise 
  #viewTotalBookPromise
  #findDupPromise
  #viewListInclLoanPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new BookPerm(session)
  }

  validateCreate() {
    this.#createPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_BOOK, this.#session)
    return this
  }

  validateUpdate() {
    this.#updatePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_BOOK, this.#session)
    return this
  }

  validateDelete() {
    this.#deletePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.DEL_BOOK, this.#session)
    return this
  }

  validateView() {
    this.#viewPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_BOOK, this.#session)
    return this
  } 

  validateViewTopTenLoanedBook() {
    this.#viewTopTenLoanedBookPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOP_TEN_LOANED_BOOK, this.#session)
    return this
  } 

  validateViewList() {
    this.#viewListPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_BOOK, this.#session)
    return this
  }

  validateViewTotalBook() {
    this.#viewTotalBookPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_BOOK, this.#session)
    return this
  }

  validateViewListPage() {
    this.#viewListPagePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_BOOK, this.#session)
    return this
  }

  validateFindDup() {
    this.#findDupPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.FIND_DUP_BOOK, this.#session)
    return this
  }

  validateViewListInclLoan() {
    this.#viewListInclLoanPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_INCL_LOAN_BOOK, this.#session)
    return this
  }

  validateRestore() {
    this.#restorePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.RESTORE_BOOK, this.#session)
    return this
  }

  validateDataCanDeleted() {
    this.#dataCanDeletedPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VERIFY_CAN_DEL_DATA_BOOK, this.#session)
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
      canViewListPage,
      canRestore,
      verifyDataCanDeleted,
      canViewTopTenLoanedBook,
      canViewTotalBook,
      canFindDup,
      canViewListInclLoan,
    ] = await Promise.all([
        this.#createPromise,
        this.#updatePromise,
        this.#deletePromise,
        this.#viewPromise,
        this.#viewListPromise,
        this.#viewListPagePromise,
        this.#restorePromise,
        this.#dataCanDeletedPromise,
        this.#viewTopTenLoanedBookPromise, 
        this.#viewTotalBookPromise,
        this.#findDupPromise,
        this.#viewListInclLoanPromise,
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
    if (canViewListPage !== undefined) {
      result.canViewListPage = canViewListPage
    }
    if (canRestore !== undefined) {
      result.canRestore = canRestore
    }
    if (verifyDataCanDeleted !== undefined) {
      result.verifyDataCanDeleted = verifyDataCanDeleted
    }
    if (canViewTopTenLoanedBook !== undefined) {
      result.canViewTopTenLoanedBook = canViewTopTenLoanedBook
    }
    if (canViewTotalBook !== undefined) {
      result.canViewTotalBook = canViewTotalBook
    }
    if (canFindDup !== undefined) {
      result.canFindDup = canFindDup
    }
    if (canViewListInclLoan !== undefined) {
      result.canViewListInclLoan = canViewListInclLoan
    }
    return result
  }
}

export default BookPerm