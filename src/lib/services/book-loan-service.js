import 'server-only'

import MemberDAL from '../dal/member-dal';
import sql from '../config/db';
import BookDAL from '../dal/book-dal';
import { NotFoundError } from '../errors/not-found-error';
import BookOnLoanViewDAL from '../dal/dbview/book-on-loan-view-dal';
import { BadRequestError } from '../errors/bad-request-error';
import { BOOK_LOAN } from '../constants/book-loan';
import BookLoanDAL from '../dal/book-loan-dal';
import { ActionFailedError } from '../errors/action-failed-error';
import { createBookLoanDTO } from '../dto/book-loan-dto';
import { attachBookToOneBookLoan, attachMemberToOneBookLoan } from '../helpers/modify-data-helper';
import { createArrBookOnLoanViewDTO } from '../dto/book-on-loan-view-dto';
import BookLoanHistViewDAL from '../dal/dbview/book-loan-hist-view-dal';
import { createArrBookLoanHistViewDTO } from '../dto/book-loan-hist-dto';
import { generateBookLoanHistExcel } from '../excel/book-loan-hist-excel';
import { eachDayOfInterval, format, setMonth, startOfMonth, endOfMonth } from 'date-fns';
import Auth from '../auth/auth';

const isFound = async ({ memberId, bookId }) => {
  //TODO
  return false;
}

const mapData = async (bookLoan) => {
  const bookAttached = await attachBookToOneBookLoan(bookLoan)
  const memberAttached = await attachMemberToOneBookLoan(bookAttached)

  const data = {... memberAttached}
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
    
    return await mapData(data)
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

      const auth = await Auth.validateSession()
      const currUserId = auth.getUserId()

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

        const [savedData] = await BookLoanDAL.save(sql, { bookId, memberId}, currUserId)
        if (savedData === null) {
          throw new ActionFailedError(`failed to save book loan data, book_id: ${bookId}`)
        }

        const mapped = await mapData(savedData)
        loans.push(mapped)
      }
  
      return loans
    })
  },

  complete: async ({ id }) => await sql.begin(async (sql) => {
    const auth = await Auth.validateSession()
    const currUserId = auth.getUserId()

    const [bookLoan] = await BookLoanDAL.findStillLoanById(sql, id)
    if (!bookLoan) {
      throw new BadRequestError('bookLoanId', 'bookLoanId is not valid')
    }

    const data = {id}
    const [savedData] = await BookLoanDAL.complete(sql, data, currUserId)
    if (savedData === null) {
      throw new ActionFailedError(`failed to complete the loaned book, bookLoanId: ${id}`)
    }

    return await mapData(savedData)
  }),

  getAllHistPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
    bookId = null,
    memberId = null,
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
      bookId: bookId && parseInt(bookId),
      memberId: memberId && parseInt(memberId),
    }

    const items = await BookLoanHistViewDAL.getAllPaginated(sql, data)
    return {
      ...items,
      data: createArrBookLoanHistViewDTO(items.data),
    }
  },

  exportHistToExcel: async () => {
    const data = await BookLoanHistViewDAL.findAllForExcel(sql)
    const fileBuffer = await generateBookLoanHistExcel({ bookLoanHist: data }) 

    return fileBuffer
  },

  calcTotal: async () => {
    const data = await BookLoanDAL.total(sql)
    return parseInt(data[0]['total'])
  },

  chartTotalCompleteYear: async (year) => {
    if (year === null || year === undefined) throw Error('year must not be empty')

    const months = Array.from({ length: 12 }, (_, idx) =>
      format(setMonth(new Date(year, 0, 1), idx), 'yyyy-MM')
    );

    const data = await BookLoanDAL.totalCompleteYear(sql, year)

    return months.map((month, idx) => {
      const monthInt = idx+1
      const foundTotalInMonth = data.find(elem => parseInt(elem.month) === monthInt)

      return {
        month,
        total : foundTotalInMonth ? parseInt(foundTotalInMonth.total) : 0
      }
    })
  },

  //TODO: clean code
  chartTotalCompleteMonth: async (year, month) => {
    if (month === null || month === undefined) throw Error('month must be not empty')
    if (year === null || year === undefined) throw Error('year must be not empty')

    const months = Array.from({ length: 12 }, (_, month) => {
      const date = new Date(year, month);

      return {
        month: month + 1,
        dates: eachDayOfInterval({
          start: startOfMonth(date),
          end: endOfMonth(date),
        }),
      };
    });

    const data = await BookLoanDAL.totalCompleteMonth(sql, year, month)

    return months[month-1]
      .dates
      .map((date, idx) => {
        const dayInt = idx+1
        const foundTotalInDay = data.find(elem => parseInt(elem.day) === dayInt)

        return {
          date: format(date, 'yyy-MM-dd'),
          total : foundTotalInDay ? parseInt(foundTotalInDay.total) : 0
        }
      })
  },

  getTotalCompleteYearAll: async () => {
    const data = await BookLoanDAL.totalCompleteYearAll(sql)
    return data.map((elem) => ({ ...elem, total: parseInt(elem.total) }))
  }
}

export default BookLoanService 