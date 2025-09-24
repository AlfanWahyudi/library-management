import 'server-only'

import AuthorViewDAL from '../dal/dbview/author-view-dal'
import { createAuthorDTO } from '../dto/author-dto'
import AuthorDAL from '../dal/author-dal'
import CountryDAL from '../dal/country-dal'
import { createCountry } from '../models/country-model'

const resourceCode = 'AUT'

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

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {

    const items = await AuthorViewDAL.getAllPaginated({ page, limit, orderBy, orderDir, search, searchFields})
    const dataMapped = items.data.map((author) => {
      const country = createCountry({ code: author.countryCode, name: author.countryName  })
      return createAuthorDTO({...author, country})
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
    const country = await CountryDAL.getByCode({ code: countryCode })

    if (country === null) {
      throw new Error('countryCode property is not found.')
    }

    if (id !== null) {
      const author = await AuthorDAL.findById({ id: parseInt(id) })

      if (author === null) {
        throw new Error('author id is not found.')
      }
    }

    const author = await AuthorDAL.save({ id, fullName, countryCode, about, activeSince })

    return createAuthorDTO({
      ...author,
      country
    })
  },

  delete: async({id}) => {
    const author = await AuthorDAL.findById({ id: parseInt(id) })

    if (author === null) {
      throw new Error('author id is not found.')
    }

    return await AuthorDAL.delete({ id: author.id })
  }
}

export default AuthorService  