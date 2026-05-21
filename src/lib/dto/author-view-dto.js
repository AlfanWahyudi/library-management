import 'server-only'

export const createAuthorViewDTO = ({
  id = null,
  fullName,
  country,
  activeSince = null,
  about = null,
  createdAt = null,
  updatedAt = null,
  bookCount = null
}) => {

  if (typeof(fullName) !== 'string') throw new TypeError('fullName property must be a string')
  if (typeof(country) !== 'object') throw new TypeError('country property must be an object')

  return {
    id,
    fullName,
    country, 
    about, 
    activeSince, 
    createdAt, 
    updatedAt, 
    bookCount,
  }
}
