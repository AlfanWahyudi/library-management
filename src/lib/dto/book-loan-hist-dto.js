import 'server-only'

export const createBookLoanHistViewDTO = ({
  id,
  bookId,
  bookTitle,
  bookIsbn,
  memberId,
  memberFullName,
  memberEmail,
  startDate,
  endDate,
  finishedDate,
  createdAt = null,
  updatedAt = null,
}) => {
  return {
    id,
    bookId,
    bookTitle,
    bookIsbn,
    memberId,
    memberFullName,
    memberEmail,
    startDate,
    endDate,
    finishedDate,
    createdAt,
    updatedAt,
  }
}

export const createArrBookLoanHistViewDTO = (data = []) => {
  return data.map((item) => createBookLoanHistViewDTO(item))
}
