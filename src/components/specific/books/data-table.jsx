"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  colsDefBook, 
  searchingItemsBook, 
  getSearchItemsIdBook,
  defaultColFiltersBook
} from "./column-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedListBook } from "@/lib/http/book-http"

const getColsDef = ({ showUpdateBtn }) => {
  return colsDefBook
    .setDefaultCols()
    .addActionCol({ showUpdateBtn })
    .get()
}

export default function BookDataTable({ canOpenUpdate = true }) {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListBook,
    searchFields: getSearchItemsIdBook(),
    columnsDef: getColsDef({ showUpdateBtn: canOpenUpdate }),
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