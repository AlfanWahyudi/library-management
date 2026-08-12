import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class MemberPerm {
  #session

  #createPromise
  #updatePromise
  #viewPromise
  #viewListPagePromise
  #findDupPromise
  #viewTopTenLoanBookPromise
  #viewListPromise
  #viewTotalPromise
  #exportExcelListAllPromise
  #viewListSearchableInclLoanPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new MemberPerm(session)
  }

  validateCreate() {
    this.#createPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_MEMBER, this.#session)
    return this
  }

  validateUpdate() {
    this.#updatePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.UPD_MEMBER, this.#session)
    return this
  }

  validateView() {
    this.#viewPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_MEMBER, this.#session)
    return this
  } 

  validateViewTopTenLoanBook() {
    this.#viewTopTenLoanBookPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOP_TEN_LOAN_BOOK_MEM, this.#session)
    return this
  } 

  validateViewList() {
    this.#viewListPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_MEMBER, this.#session)
    return this
  }

  validateViewTotal() {
    this.#viewTotalPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_MEMBER, this.#session)
    return this
  }

  validateExportExcelListAll() {
    this.#exportExcelListAllPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_MEMBER, this.#session)
    return this
  }

  validateViewListPage() {
    this.#viewListPagePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_MEMBER, this.#session)
    return this
  }

  validateFindDup() {
    this.#findDupPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.FIND_DUP_MEMBER, this.#session)
    return this
  }

  validateViewListSearchableInclLoan() {
    this.#viewListSearchableInclLoanPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_SEARCHABLE_INCL_LOAN_MEMBER, this.#session)
    return this
  }

  async exec() {
    const result = {}

    const [
      canCreate,
      canUpdate,
      canView,
      canViewListPage,
      canFindDup,
      canViewTopTenLoanBook,
      canViewList,
      canViewTotal,
      canExportExcelListAll,
      canViewListSearchableInclLoan,
    ] = await Promise.all([
      this.#createPromise,
      this.#updatePromise,
      this.#viewPromise,
      this.#viewListPagePromise,
      this.#findDupPromise,
      this.#viewTopTenLoanBookPromise,
      this.#viewListPromise,
      this.#viewTotalPromise,
      this.#exportExcelListAllPromise,
      this.#viewListSearchableInclLoanPromise,
    ])

    if (canCreate !== undefined) {
      result.canCreate = canCreate
    }
    if (canUpdate !== undefined) {
      result.canUpdate = canUpdate
    }
    if (canView !== undefined) {
      result.canView = canView
    }
    if (canViewListPage !== undefined) {
      result.canViewListPage = canViewListPage
    }
    if (canFindDup !== undefined) {
      result.canFindDup = canFindDup
    }
    if (canViewTopTenLoanBook !== undefined) {
      result.canViewTopTenLoanBook = canViewTopTenLoanBook
    }
    if (canViewList !== undefined) {
      result.canViewList = canViewList
    }
    if (canViewTotal !== undefined) {
      result.canViewTotal = canViewTotal
    }
    if (canExportExcelListAll !== undefined) {
      result.canExportExcelListAll = canExportExcelListAll
    }
    if (canViewListSearchableInclLoan !== undefined) {
      result.canViewListSearchableInclLoan = canViewListSearchableInclLoan
    }

    return result
  }
}

export default MemberPerm