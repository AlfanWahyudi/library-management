export function createAuthorDTO({
  id = null, 
  full_name, 
  nationality = null, 
  active_since = null, 
  about = null, 
  created_at = null, 
  updated_at = null, 
  book_count = null
}) {

  return {
    id: id ? parseInt(id) : null,
    fullName: full_name,
    nationality: nationality, 
    activeSince: active_since ? parseInt(active_since) : null, 
    about: about, 
    createdAt: created_at, 
    updatedAt: updated_at, 
    bookCount: book_count ? parseInt(book_count) : null,
  }
}