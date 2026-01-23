import 'server-only'

export function createBook({
  id, 
  isbn, 
  title, 
  publicationDate, 
  subTitle = null, 
  publisher = null, 
  page = null,
  language = null,
  edition = null,
  createdAt = null,
  updatedAt = null,
  deletedAt = null,
  createdBy = null,
  updatedBy = null,
  deletedBy = null,
}) {

  return {
    id: parseInt(id),
    isbn: isbn.toString(),
    title: title.toString(), 
    publicationDate: new Date(publicationDate),
    subTitle: subTitle && subTitle.toString(),
    publisher: publisher && publisher.toString(),
    page: page && parseInt(page), 
    language: language && language.toString(), 
    edition: edition && parseInt(edition), 
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
    deletedAt: deletedAt && new Date(deletedAt),
    createdBy: createdBy && createdBy.toString(), 
    updatedBy: updatedBy && updatedBy.toString(), 
    deletedBy: deletedBy && deletedBy.toString(), 
  }
}
