import 'server-only'
import MemberDAL from '../dal/member-dal';
import sql from '../config/db';
import AuthorDAL from '../dal/author-dal';
import BookDAL from '../dal/book-dal';
import { NotFoundError } from '../errors/not-found-error';
import BookOnLoanViewDAL from '../dal/dbview/book-on-loan-view-dal';
import { BadRequestError } from '../errors/bad-request-error';
import { BOOK_LOAN } from '../constants/book-loan';
import BookLoanDAL from '../dal/book-loan-dal';
import { add, endOfDay, format } from 'date-fns';
import { ActionFailedError } from '../errors/action-failed-error';
import { createBookLoanDTO } from '../dto/book-loan-dto';
import { attachBookToOneBookLoan, attachMemberToOneBookLoan } from '../helpers/modify-data-helper';
import { createArrBookOnLoanViewDTO } from '../dto/book-on-loan-view-dto';
import ViolationDAL from '../dal/violation-dal';
import LoanViolationDAL from '../dal/loan-violation-dal';

const isFound = async ({ memberId, bookId }) => {
  //TODO
  return false;
}

const mapData = async (bookLoan, violations = []) => {
  const bookAttached = await attachBookToOneBookLoan(bookLoan)
  const memberAttached = await attachMemberToOneBookLoan(bookAttached)

  const data = {... memberAttached, violations}
  return createBookLoanDTO(data)
}

const BookLoanService = {
  findStillLoanById: async (id) => {
    const bookLoanId = parseInt(id)

    const [data] = await BookLoanDAL.findStillLoanById(sql, bookLoanId)
    if (!data) {
      throw new NotFoundError('bookLoanId', 'bookLoanId is not found or the loan has been completed ')
    }
    
    return await mapData(data, [])
  },

  findCompleteLoanById: async (id) => {
    const bookLoanId = parseInt(id)

    const [data] = await BookLoanDAL.findCompleteLoanById(sql, bookLoanId)
    if (!data) {
      throw new NotFoundError('bookLoanId', 'bookLoanId is not found or the loan has not been completed ')
    }

    const viols = []
    const loanViols = await LoanViolationDAL.findByBookLoanId(sql, bookLoanId)
    for (let loanViol of loanViols) {
      const viol = await ViolationDAL.findById(sql, loanViol.id)
      if (!viol) {
        throw new NotFoundError('violationId', 'violation id is not found')
      }
      viols.push(viol)
    }
    
    return await mapData(data, viols)
  },

  checkBookIsLoaned: async (bookId) => {
    const data = await BookOnLoanViewDAL.findByBookId(sql, bookId)
    return data.length > 0
  },

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
    }

    const items = await BookOnLoanViewDAL.getAllPaginated(sql, data)
    return {
      ...items,
      data: createArrBookOnLoanViewDTO(items.data),
    }
  },

  save: async ({
    bookIds,
    memberId,
  }) => {

    return await sql.begin(async (sql) => {
      const loans = []

      const [member] = await MemberDAL.findById(sql, memberId)
      if (!member) {
        throw new NotFoundError('memberId', 'memberId is not found')
      }

      const bookLoans = await BookOnLoanViewDAL.findByMemberId(sql, memberId)
      if ((bookLoans.length === BOOK_LOAN.MAX) && bookIds.length > 0) {
        throw new BadRequestError('memberId', `Member already loaned ${bookLoans.length} books, max_loan: ${BOOK_LOAN.MAX}`)
      }

      const remain = BOOK_LOAN.MAX - bookLoans.length
      const moreThanMax = bookIds.length > remain
      if (moreThanMax) {
        throw new BadRequestError('memberId', `Remaining book to loan for this member is ${remain}, max_loan: ${BOOK_LOAN.MAX}`)
      }

      for (let bookId of bookIds) {
        const [book] = await BookDAL.findById(sql, bookId)
        if (!book) {
          throw new NotFoundError('bookId', `bookId is not found, id: ${bookId}`)
        }

        const bookOnLoan = await BookLoanService.checkBookIsLoaned(bookId)
        if (bookOnLoan) {
          throw new BadRequestError('bookId', `The book is currently on loan, id: ${bookId}`)
        }

        const [savedData] = await BookLoanDAL.save(sql, { bookId, memberId})
        if (savedData === null) {
          throw new ActionFailedError(`failed to save book loan data, book_id: ${bookId}`)
        }

        const mapped = await mapData(savedData)
        loans.push(mapped)
      }
  
      return loans
    })
  },

  complete: async ({ id, violationIds = [] }) => {

    return await sql.begin(async (sql) => {
      const viols = []

      const [bookLoan] = await BookLoanDAL.findStillLoanById(sql, id)
      if (!bookLoan) {
        throw new BadRequestError('bookLoanId', 'bookLoanId is not valid')
      }

      for (let violId of violationIds) {
        const [viol] = await ViolationDAL.findById(sql, violId)
        if (!viol) {
          throw new BadRequestError('violationId', `violationId is not found, id: ${violId}`)
        }

        const [savedLoanViol] = await LoanViolationDAL.save(sql, { violationId: violId, bookLoanId: id })
        if (savedLoanViol === null) {
          throw new ActionFailedError(`failed to save loan violation data`)
        }

        viols.push(viol)
      }

      const data = {id}
      const [savedData] = await BookLoanDAL.complete(sql, data)
      if (savedData === null) {
        throw new ActionFailedError(`failed to complete the loaned book, bookLoanId: ${id}`)
      }

      return await mapData(savedData, viols)
    })
  },
  
}

export default BookLoanService 