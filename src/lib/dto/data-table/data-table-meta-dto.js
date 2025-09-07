import 'server-only'

export function createDataTableMetaDTO({ 
  page = 0,
  limit = 0,
  pageCount = 0,
  dataCount = 0,
  itemsCount = 0,
}) {
  if (typeof(page) !== 'number') throw new Error('page property must be a number')
  if (typeof(limit) !== 'number') throw new Error('limit property must be a number')
  if (typeof(pageCount) !== 'number') throw new Error('pageCount property must be a number')
  if (typeof(dataCount) !== 'number') throw new Error('dataCount property must be a number')
  if (typeof(itemsCount) !== 'number') throw new Error('itemsCount property must be a number')

  return {
    page,
    limit,
    dataCount,
    pageCount,
    itemsCount,
  }
}