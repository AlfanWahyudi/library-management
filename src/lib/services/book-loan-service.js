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
import { DATETIME_PATTERN } from '../constants/datetime-pattern';
import { createArrBookOnLoanViewDTO } from '../dto/book-on-loan-view-dto';

const isFound = async ({ memberId, bookId }) => {
  //TODO
  return false;
}

const mapData = async (bookLoan) => {
  const bookAttached = await attachBookToOneBookLoan(bookLoan)
  const memberAttached = await attachMemberToOneBookLoan(bookAttached)
  return createBookLoanDTO(memberAttached)
}

const BookLoanService = {
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
}

export default BookLoanService 