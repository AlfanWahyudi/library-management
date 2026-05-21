"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefBook, 
  searchingItemsBook, 
  getSearchItemsIdBook,
  defaultColFiltersBook
} from "./column-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedListBook } from "@/lib/http/book-http"

export default function BookDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListBook,
    searchFields: getSearchItemsIdBook(),
    columnsDef: columnsDefBook,
    defaultColFilters: defaultColFiltersBook,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsBook} 
        table={table} 
      >
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}