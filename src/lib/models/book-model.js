import 'server-only'

export function createBook({
  id, 
  isbn, 
  title, 
  publication_date, 
  sub_title = null, 
  publisher = null, 
  page = null,
  language = null,
  edition = null,
  created_by = null,
  updated_by = null,
  deleted_by = null,
  created_at = null,
  updated_at = null,
  deleted_at = null,
}) {

  return {
    id: parseInt(id),
    isbn: isbn.toString(),
    title: title.toString(), 
    publicationDate: new Date(publication_date),
    subTitle: sub_title && sub_title.toString(),
    publisher: publisher && publisher.toString(),
    page: page && parseInt(page), 
    language: language && language.toString(), 
    edition: edition && parseInt(edition), 
    createdAt: created_at && new Date(created_at),
    updatedAt: updated_at && new Date(updated_at), 
    deletedAt: deleted_at && new Date(deleted_at),
    createdBy: created_by && created_by.toString(), 
    updatedBy: updated_by && updated_by.toString(), 
    deletedBy: deleted_by && updated_by.toString(), 
  }
}
