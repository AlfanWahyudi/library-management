import { USER_PERMISSION } from "../../constants/user"
import Authorize from "../authorize"

class BookLoanPerm {
  #session
  #createPromise
  #viewPromise
  #viewListPromise
  #exportExcelListAllPromise
  #viewListPagePromise
  #viewTotalPromise
  #viewHistoryPromise
  #viewTotalYearAllPromise
  #completeLoanPromise
  #viewListPageHistoryPromise
  #exportExcelListAllHistoryPromise

  constructor(session) {
    this.#session = session
  }

  static validation(session) {
    return new BookLoanPerm(session)
  }

  validateCreate() {
    this.#createPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.CRE_BOOK_LOAN, this.#session)
    return this
  }

  validateView() {
    this.#viewPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_BOOK_LOAN, this.#session)
    return this
  } 

  validateViewTotal() {
    this.#viewTotalPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_BOOK_LOAN, this.#session)
    return this
  } 

  validateViewHistory() {
    this.#viewHistoryPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_HISTORY_BOOK_LOAN, this.#session)
    return this
  } 

  validateViewTotalYearAll() {
    this.#viewTotalYearAllPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_TOTAL_YEAR_ALL_BOOK_LOAN, this.#session)
    return this
  }

  validateViewList() {
    this.#viewListPromise =Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_BOOK_LOAN, this.#session)
    return this
  }

  validateExportExcelListAll() {
    this.#exportExcelListAllPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_HISTORY_BOOK_LOAN, this.#session)
    return this
  }

  validateExportExcelListAllHistory() {
    this.#exportExcelListAllHistoryPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.EXPORT_EXCEL_LIST_ALL_HISTORY_BOOK_LOAN, this.#session)
    return this
  }

  validateCompleteLoan() {
    this.#completeLoanPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.CMP_BOOK_LOAN, this.#session)
    return this
  }

  validateViewListPage() {
    this.#viewListPagePromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_BOOK_LOAN, this.#session)
    return this
  }

  validateViewListPageHistory() {
    this.#viewListPageHistoryPromise = Authorize.verifyPermissionBySession(USER_PERMISSION.VIEW_LIST_PAGE_HISTORY_BOOK_LOAN, this.#session)
    return this
  }

  async exec() {
    const result = {}
    
    const [
      canCreate,
      canView,
      canViewList,
      canExportExcelListAll,
      canViewListPage,
      canViewTotal,
      canViewHistory,
      canViewTotalYearAll,
      canCompleteLoan,
      canViewListPageHistory,
      canExportExcelListAllHistory,
    ] = await Promise.all([
        this.#createPromise,
        this.#viewPromise,
        this.#viewListPromise,
        this.#exportExcelListAllPromise,
        this.#viewListPagePromise,
        this.#viewTotalPromise,
        this.#viewHistoryPromise,
        this.#viewTotalYearAllPromise,
        this.#completeLoanPromise,
        this.#viewListPageHistoryPromise,
        this.#exportExcelListAllHistoryPromise
    ])

    if (canCreate !== undefined) {
      result.canCreate = canCreate
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
    if (canViewTotal !== undefined) {
      result.canViewTotal = canViewTotal
    }
    if (canViewHistory !== undefined) {
      result.canViewHistory = canViewHistory
    }
    if (canViewTotalYearAll !== undefined) {
      result.canViewTotalYearAll = canViewTotalYearAll
    }
    if (canCompleteLoan !== undefined) {
      result.canCompleteLoan = canCompleteLoan
    }
    if (canViewListPageHistory !== undefined) {
      result.canViewListPageHistory = canViewListPageHistory
    }

    if (canExportExcelListAllHistory !== undefined) {
      result.canExportExcelListAllHistory = canExportExcelListAllHistory
    }
    
    return result
  }
} 

export default BookLoanPerm