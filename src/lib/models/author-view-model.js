import 'server-only'

export function createAuthorViewModel({
  id,
  fullName,
  bookCount,
  countryCode,
  countryName,
  activeSince,
  about,
  createdAt,
  updatedAt,
}) {

  return {
    id: id && parseInt(id),
    fullName: fullName.toString(),
    bookCount: bookCount && parseInt(bookCount),
    countryCode: countryCode.toString(), 
    countryName: countryName.toString(), 
    about: about && about.toString(), 
    activeSince: activeSince && parseInt(activeSince), 
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
  }
}