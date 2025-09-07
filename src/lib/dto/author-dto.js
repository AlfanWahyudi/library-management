import 'server-only'

export const createAuthorDTO = ({
  id = null,
  fullName,
  nationality = null,
  activeSince = null,
  about = null,
  createdAt = null,
  updatedAt = null,
  bookCount = null
}) => {
  if (typeof(fullName) !== 'string') throw new Error('fullName property must be a string')

  return {
    id,
    fullName,
    nationality, 
    about, 
    activeSince, 
    createdAt, 
    updatedAt, 
    bookCount,
  }
}

export const createArrAuthorDTO = (authorArr = []) => {
  return authorArr.map((author) => createAuthorDTO(author))
}