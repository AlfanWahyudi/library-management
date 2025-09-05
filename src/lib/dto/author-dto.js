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
    id: id && parseInt(id),
    fullName: fullName,
    nationality: nationality && nationality.toString(), 
    about: about && about.toString(), 
    activeSince: activeSince && parseInt(activeSince), 
    createdAt: createdAt && new Date(createdAt), 
    updatedAt: updatedAt && new Date(updatedAt), 
    bookCount: bookCount && parseInt(bookCount),
  }
}

export const createArrAuthorDTO = (authorArr = []) => {
  return authorArr.map((author) => createAuthorDTO(author))
}