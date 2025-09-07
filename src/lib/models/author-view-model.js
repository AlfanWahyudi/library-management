import 'server-only'

export function createAuthorViewModel({
  id,
  full_name,
  book_count,
  nationality,
  active_since,
  about,
  created_at,
  updated_at,
}) {

  return {
    id: id && parseInt(id),
    fullName: full_name.toString(),
    bookCount: book_count && parseInt(book_count),
    nationality: nationality && nationality.toString(), 
    about: about && about.toString(), 
    activeSince: active_since && parseInt(active_since), 
    createdAt: created_at && new Date(created_at),
    updatedAt: updated_at && new Date(updated_at), 
  }
}