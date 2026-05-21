import 'server-only'
import { createMemberDTO } from './member-dto'
import { createBookDTO } from './book-dto'

export const createBookLoanDTO = ({
  id, 
  member, 
  book, 
  startDate, 
  endDate, 
  finishedDate = null, 
  createdAt = null, 
  updatedAt = null,
}) => {

  return {
    id,
    member: createMemberDTO(member), 
    book: createBookDTO(book), 
    startDate, 
    endDate, 
    finishedDate, 
    createdAt, 
    updatedAt, 
  }
}

export const createArrBookLoanDTO = (bookLoanArr = []) => {
  return bookLoanArr.map((bookLoan) => createBookLoanDTO(bookLoan))
}