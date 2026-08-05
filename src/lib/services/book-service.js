import 'server-only'

import sql from '../config/db'
import { NotFoundError } from '../errors/not-found-error'
import { ActionFailedError } from '../errors/action-failed-error'
import { BadRequestError } from '../errors/bad-request-error'
import BookDAL from '../dal/book-dal'
import { createArrBookDTO, createBookDTO } from '../dto/book-dto'
import { attachAuthorsToBooks, attachAuthorsToOneBook, attachCountryToOneAuthor } from '../helpers/modify-data-helper'
import BookAuthorDAL from '../dal/book-author-dal'
import AuthorDAL from '../dal/author-dal'
import BookLoanDAL from '../dal/book-loan-dal'
import BookOnLoanViewDAL from '../dal/dbview/book-on-loan-view-dal'

const isFound = async ({ id }) => {
  const [book] = await BookDAL.findById(sql, id)
  return book !== undefined
}

const BookService = {
  findById: async ({ id }) => {
    const [book] = await BookDAL.findById(sql, id)
    
    if (!book) {
      throw new NotFoundError('id', 'book id is not found')
    }

    const updatedBook = await attachAuthorsToOneBook(book)
    return createBookDTO(updatedBook)
  },

  isDataExist: async ({ id = null, field, value }) => {
    let result = false

    const [book] = field === 'isbn'
      ? await BookDAL.findByIsbn(sql, value)
      : []

    if (id) {
      const diffBook = book && book.id != id
      if (diffBook) {
        result = true
      }
    } else if (book) {
      result = true
    }

    return result
  },

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
    }

    const items = await BookDAL.getAllPaginated(sql, data)
    const dataUpdated = await attachAuthorsToBooks(items.data)

    return {
      data: createArrBookDTO(dataUpdated),
      meta: items.meta,
    }
  },

  create: async ({
    isbn,
    title,
    publicationDate,
    subTitle = null,
    publisher = null,
    page = null,
    language = null,
    edition = null,
    authors = [],
  }) => {
    const isbnExist = await BookService.isDataExist({ field: 'isbn', value: isbn })
    if (isbnExist) {
      throw new BadRequestError('isbn', 'isbn is already in use.')
    }

    const result = await sql.begin(async (sql) => {
      const cacheAuthor = new Map()
      const data = { isbn, title, subTitle, publisher, publicationDate, page, language, edition }

      const [savedBook] = await BookDAL.create(sql, data)
      
      for (let idx = 0; idx < authors.length; idx++) {
        const authorId = parseInt(authors[idx])

        if (cacheAuthor.has(authorId)) {
          throw new BadRequestError('author_id', 'duplicate author_id is not allowed.')
        }

        const [author] = await AuthorDAL.findById(sql, authorId)
        if (!author) {
          throw new NotFoundError('author_id', 'author id is not found.')
        }

        await BookAuthorDAL.create(sql, { authorId: author.id, bookId: savedBook.id })

        const updatedAuthor = await attachCountryToOneAuthor(author)
        cacheAuthor.set(authorId, updatedAuthor)
      }

      const saveBookUpdated = {...savedBook, authors: [...cacheAuthor.values()]}
      return createBookDTO(saveBookUpdated)
    })

    return result
  },

  update: async ({
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
  }) => {
    if (typeof(id) !== 'number') throw new Error('id must be a number')

    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'book id is not found.')
    }

    const isbnExist = await BookService.isDataExist({ id, field: 'isbn', value: isbn })
    if (isbnExist) {
      throw new BadRequestError('isbn', 'isbn is already in use.')
    }

    const result = await sql.begin(async sql => {
      const cacheAuthor = new Map()

      // validate authorIds
      for (let idx = 0; idx < authors.length; idx++) {
        const authorId = parseInt(authors[idx])
        
        if (cacheAuthor.has(authorId)) {
          throw new BadRequestError('author_id', 'duplicate author_id is not allowed.')
        }

        const [author] = await AuthorDAL.findById(sql, authorId)
        if (!author) {
          throw new NotFoundError('author_id', 'author id is not found, id: ' + authorId)
        }

        const updatedAuthor = await attachCountryToOneAuthor(author)
        cacheAuthor.set(authorId, updatedAuthor)
      }

      const bookAuthors = await BookAuthorDAL.findByBookId(sql, id)
      const authorDbIds = bookAuthors.map((data) => data.authorId.toString())

      const authorIdsDelete = authorDbIds.filter((authorDBId) => !authors.includes(authorDBId))
      authorIdsDelete.forEach(async (authorId) => {
        await BookAuthorDAL.delete(sql, { authorId, bookId: id })
      })
      
      const authorIdsCreate = authors.filter((authorId) => !authorDbIds.includes(authorId))
      authorIdsCreate.forEach(async (authorId) => {
        await BookAuthorDAL.create(sql, { authorId, bookId: id })
      })
      
      const data = { isbn, title, subTitle, publisher, publicationDate, page, language, edition }
      const [updatedBook] = await BookDAL.update(sql, data, id)

      const saveBookUpdated = {...updatedBook, authors: [...cacheAuthor.values()]}
      return createBookDTO(saveBookUpdated)
    })

    return result
  },

  isIncludeOnBookLoan: async ({ bookId }) => {
    const items = await BookOnLoanViewDAL.findByBookId(sql, parseInt(bookId))
    return items.length > 0
  },

  canDataDeleted: async ({ id }) => {
    let result = true

    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'book id is not found.')
    }

    const isOnBookLoan = await BookService.isIncludeOnBookLoan({ bookId: id })
    if (isOnBookLoan) {
      result = false
    }

    return result
  },

  delete: async ({ id }) => {
    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'book id is not found.')
    }

    const dataCanDelete = await BookService.canDataDeleted({ id })
    if (!dataCanDelete) {
      throw new BadRequestError('book_id','Failed delete: book data is already used in book loan')
    }

    const result = await sql.begin(async (sql) => {
      const [data] = await BookDAL.delete(sql, id)

      if (!data) {
        throw new ActionFailedError('failed to delete book data')
      }

      await BookAuthorDAL.deleteAllByBookId(sql, data.id)
      
      return createBookDTO(data)
    })

    return result
  },
  
  restore: async ({ id }) => {
    const [book] = await BookDAL.findById(sql, id, true)
    if (!book) {
      throw new NotFoundError('id', 'book id is not found.')
    }

    const result = await sql.begin(async (sql) => {
      const [data] = await BookDAL.restore(sql, parseInt(id))

      if (!data) {
        throw new ActionFailedError('failed to restore book data')
      }

      const updatedData = await attachAuthorsToOneBook(data)
      return createBookDTO(updatedData)
    })

    return result

  },

  includeLoanList: async ({ orderBy, orderDir }) => {
    const data = await BookDAL.includeLoanList(sql, {orderBy, orderDir})

    const onLoan = data.filter((data) => data.isLoaned)
    const avail = data.filter((data) => !data.isLoaned)

    return {
      avail,
      onLoan,
      meta: {
        totalItem: data.length,
        totalOnLoan: onLoan.length,
        totalAvail: avail.length, 
      }
    }
  },

  calcTotal: async () => {
    const data = await BookDAL.total(sql)
    return parseInt(data[0]['total'])
  },

  getTopTenLoaned: async () => {
    const topTenLoaned = await BookDAL.topTenLoaned(sql)
    return topTenLoaned.map((item) => ({ book: item.title, val: item.totalLoanedBook }))
  }
}

export default BookService
