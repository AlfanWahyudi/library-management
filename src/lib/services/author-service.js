import 'server-only'

import AuthorViewDAL from '../dal/dbview/author-view-dal'
import { createAuthorDTO } from '../dto/author-dto'
import AuthorDAL from '../dal/author-dal'
import CountryDAL from '../dal/country-dal'
import { createCountry } from '../models/country-model'
import { generateAuthorExcel } from '../excel/author-excel'
import { NotFoundError } from '../errors/not-found-error'
import { ActionFailedError } from '../errors/action-failed-error'
import sql from '../config/db'
import BookAuthorDAL from '../dal/book-author-dal'
import { BadRequestError } from '../errors/bad-request-error'
import { createAuthorViewDTO } from '../dto/author-view-dto'
import { attachCountryToOneAuthor } from '../helpers/modify-data-helper'

const resourceCode = 'AUT'

const isFound = async ({ id }) => {
  const [author] = await AuthorDAL.findById(sql, parseInt(id))
  return author !== undefined
}

const AuthorService = {
  // getById: async ({id}) => {
  //   const permission = await Permission.verify({
  //     resourceCode,
  //     operationCode: 'GET'
  //   })

  //   if (!permission.success) throw new Error(permission.message)

  //   return await AuthorDAL.getById({id})
  // },
  
  // getAll: async () => {
  //   const permission = await Permission.verify({
  //     resourceCode,
  //     operationCode: 'GET'
  //   })

  //   if (!permission.success) throw new Error(permission.message)

  //   return await AuthorDAL.getAll()
  // },

  findById: async ({ id }) => {
    const [author] = await AuthorDAL.findById(sql, parseInt(id))
    if (!author) {
      throw new NotFoundError('id', 'author id is not found')
    }
    
    const result = await attachCountryToOneAuthor(author)
    return createAuthorDTO(result)
  },

  exportToExcel: async () => {
    const authors = await AuthorViewDAL.getAllForExcel(sql)
    const fileBuffer = await generateAuthorExcel({ authors })

    return fileBuffer
  },

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {

    const data = { page, limit, orderBy, orderDir, search, searchFields }
    const items = await AuthorViewDAL.getAllPaginated(sql, data)
    const dataMapped = items.data.map((author) => {
      const country = createCountry({ code: author.countryCode, name: author.countryName  })
      return createAuthorViewDTO({...author, country})
    })

    return {
      data: dataMapped,
      meta: items.meta,
    }
  },

  save: async({
    id = null,
    fullName,
    countryCode,
    about = null,
    activeSince = null,
  }) => {
    if (id !== null) {
      const found = await isFound({ id })
      if (!found) {
        throw new NotFoundError('id', 'author id is not found.')
      }
    }

    const result = await sql.begin(async (sql) => {
      const [country] = await CountryDAL.getByCode(sql, countryCode)
      if (country === null) {
        throw new NotFoundError('countryCode', 'countryCode property is not found.')
      }

      const data = {fullName, countryCode, about, activeSince}

      const [savedData] = id === null
        ? await AuthorDAL.create(sql, data)
        : await AuthorDAL.update(sql, data, id)

      if (!savedData) {
        throw new ActionFailedError('failed to save author data')
      }

      return createAuthorDTO({
        ...savedData,
        country
      })
    })

    return result
  },

  isIncludeOnBookAuthor: async ({ id }) => {
    const items = await BookAuthorDAL.findByAuthorId(sql, id)
    return items.length > 0
  },

  canDataDeleted: async ({ id }) => {
    let result = true

    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'author id is not found.')
    }

    const isOnBookAuthor = await AuthorService.isIncludeOnBookAuthor({ id })
    if (isOnBookAuthor) {
      result = false
    }

    return result
  },

  delete: async({id}) => {
    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'author id is not found.')
    }

    const dataCanDelete = await AuthorService.canDataDeleted({ id })
    if (!dataCanDelete) {
      throw new BadRequestError('author_id','Failed delete: author data is already used in book author')
    }

    const result = await sql.begin(async (sql) => {
      const [data] = await AuthorDAL.delete(sql, id)
      if (!data) {
        throw new ActionFailedError('failed to delete author data')
      }

      const [country] = await CountryDAL.getByCode(sql, data.countryCode)

      return createAuthorDTO({
        ...data,
        country
      })
    })

    return result
  },

  restore: async ({ id }) =>{
    const found = await isFound({id})
    if (found) {
      throw new BadRequestError('id', `author data is not deleted, id: ${id}`)
    }

    const result = await sql.begin(async (sql) => {
      const [data] = await AuthorDAL.restore(sql, id)
      if (!data) {
        throw new ActionFailedError('failed to restore author data')
      }
      
      const [country] = await CountryDAL.getByCode(sql, data.countryCode)

      return createAuthorDTO({
        ...data,
        country
      })
    })

    return result
  },

  getBooks: async({ id }) => {
    const found = await isFound({ id })
    if (!found) {
      throw new NotFoundError('id', 'author id is not found.')
    }

    return await AuthorDAL.getBooks(sql, id)  
  }
}

export default AuthorService  