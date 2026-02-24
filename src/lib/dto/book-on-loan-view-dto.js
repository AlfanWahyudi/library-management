import 'server-only'

export const createBookOnLoanViewDTO = ({
  id,
  bookId,
  bookTitle,
  bookIsbn,
  memberId,
  memberFullName,
  memberEmail,
  startDate,
  endDate,
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
    createdAt,
    updatedAt,
  }
}


export const createArrBookOnLoanViewDTO = (data = []) => {
  return data.map((item) => createBookOnLoanViewDTO(item))
}
