export function createDataTableParamsDTO({ 
  search = '', 
  searchFields = '', 
  page = 0, 
  limit = 10, 
  orderBy = 'updated_at', 
  orderDir = 'desc'  
}) {

  return {
    search,
    searchFields,
    page,
    limit,
    orderBy,
    orderDir
  }
}