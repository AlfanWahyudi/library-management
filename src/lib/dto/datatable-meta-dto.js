export function createDataTableMetaDTO({ 
  page = 0,
  limit = 0,
  page_count = 0,
  items_count = 0,
  filtered_count = 0
}) {

  return {
    page: page,
    limit: limit,
    pageCount: page_count,
    itemsCount: items_count,
    filteredCount: filtered_count,
  }
}