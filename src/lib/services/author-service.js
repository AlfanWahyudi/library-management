import 'server-only'

import AuthorViewDAL from '../dal/dbview/author-view-dal'
import { createArrAuthorDTO, createAuthorDTO } from '../dto/author-dto'
import { createDataTableResDTO } from '../dto/data-table/data-table-res-dto'

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
    const dataMapped = createArrAuthorDTO(items.data)

    return createDataTableResDTO({
      data: dataMapped,
      meta: items.meta,
    })
  }
}

export default AuthorService  