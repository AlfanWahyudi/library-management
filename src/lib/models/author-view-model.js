import 'server-only'

export function createAuthorViewModel({
  id,
  full_name,
  book_count,
  country_code,
  country_name,
  active_since,
  about,
  created_at,
  updated_at,
}) {

  return {
    id: id && parseInt(id),
    fullName: full_name.toString(),
    bookCount: book_count && parseInt(book_count),
    countryCode: country_code.toString(), 
    countryName: country_name.toString(), 
    about: about && about.toString(), 
    activeSince: active_since && parseInt(active_since), 
    createdAt: created_at && new Date(created_at),
    updatedAt: updated_at && new Date(updated_at), 
  }
}