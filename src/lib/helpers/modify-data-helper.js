import 'server-only'

import sql from '../config/db'
import CountryDAL from '../dal/country-dal'
import BookDAL from '../dal/book-dal'
import MemberDAL from '../dal/member-dal'

export const attachCountryToOneAuthor = async (author) => {
  const [country] = await CountryDAL.getByCode(sql, author.countryCode)

  return {
    ...author,
    country
  }
}

export const attachCountriesToAuthors = async (authors) => {
  const cache = new Map()

  const updatedAuthors = await Promise.all(
    authors.map(async author => {
      if (!cache.has(author.countryCode)) {
        const [country] = await CountryDAL.getByCode(sql, author.countryCode)
        cache.set(author.countryCode, country)
      }
      
      return {
        ...author,
        country: cache.get(author.countryCode)
      }
    })
  )

  cache.clear()

  return updatedAuthors
}

export const attachAuthorsToOneBook = async (book) => {
  const authors = await BookDAL.getAuthors(sql, book.id)
  const updatedAuthors = await attachCountriesToAuthors(authors)

  return {
    ...book,
    authors: updatedAuthors
  }
}

export const attachAuthorsToBooks = async (books) => {
  return await Promise.all(
    books.map(async book => {
      return await attachAuthorsToOneBook(book)
    })
  )
}

export const attachBookToOneBookLoan = async (bookLoan) => {
  const [book] = await BookDAL.findById(sql, bookLoan.bookId)
  const updatedBook = await attachAuthorsToOneBook(book)

  return {
    book: updatedBook,
    ...bookLoan
  }
}

export const attachMemberToOneBookLoan = async (bookLoan) => {
  const [member] = await MemberDAL.findById(sql, bookLoan.memberId)

  return {
    member,
    ...bookLoan
  }
}