import 'server-only'
import { createArrAuthorDTO, createAuthorDTO } from './author-dto'

export const createBookDTO = ({
  id, 
  isbn, 
  title, 
  publicationDate,
  subTitle = null, 
  publisher = null, 
  page = null,
  language = null,
  edition = null,
  authors = [],
  createdAt = null, 
  updatedAt = null,
}) => {

  if (typeof(isbn) !== 'string') throw new TypeError('isbn property must be a string')
  if (typeof(title) !== 'string') throw new TypeError('title property must be a string')

  return {
    id, 
    isbn, 
    title, 
    publicationDate,
    subTitle, 
    publisher, 
    page,
    language,
    edition,
    authors: authors.length > 0 ? createArrAuthorDTO(authors) : [],
    createdAt, 
    updatedAt, 
  }
}

export const createArrBookDTO = (bookArr = []) => {
  return bookArr.map((book) => createBookDTO(book))
}