import 'server-only'
import { createMemberDTO } from './member-dto'
import { createBookDTO } from './book-dto'
import { createArrViolationDTO } from './violation-dto'

export const createBookLoanDTO = ({
  id, 
  member, 
  book, 
  startDate, 
  endDate, 
  finishedDate = null, 
  createdAt = null, 
  updatedAt = null,
  violations = [],
}) => {

  return {
    id,
    member: createMemberDTO(member), 
    book: createBookDTO(book), 
    startDate, 
    endDate, 
    finishedDate, 
    violations: createArrViolationDTO(violations),
    createdAt, 
    updatedAt, 
  }
}

export const createArrBookLoanDTO = (bookLoanArr = []) => {
  return bookLoanArr.map((bookLoan) => createBookLoanDTO(bookLoan))
}