import 'server-only'

import AuthorViewDTO from '../dto/dbview/author-view-dto'

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
  }) => {

    const result = {
      data: [],
      meta: {
        page,
        limit,
        pageCount: 0,
        itemsCount: 0,
        filteredCount: 0,
      }
    }

    const totalItems = (await AuthorViewDTO.getAll()).length
    const totalPage = Math.ceil(totalItems/limit)

    result.meta.itemsCount = totalItems
    result.meta.pageCount = totalPage

    if (page <= totalPage) {
      const data = await AuthorViewDTO.getAllPaginated({page, limit, orderBy, orderDir, search})

      result.data = [...data]
      result.meta.filteredCount = data.length
    }

    return result

  }
}

export default AuthorService  