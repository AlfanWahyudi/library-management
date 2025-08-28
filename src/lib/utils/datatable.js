import 'server-only'


export const getPaginatedList = async ({
  page,
  limit,
  orderBy,
  orderDir,
  search,
  searchFields,
  getTotalItems,
  getData
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

    const totalItems = await getTotalItems()
    const totalPage = Math.ceil(totalItems/limit)

    result.meta.itemsCount = totalItems
    result.meta.pageCount = totalPage

    if (page <= totalPage) {
      const data = await getData({page, limit, orderBy, orderDir, search, searchFields})

      result.data = [...data]
      result.meta.filteredCount = data.length
    }

    return result
}