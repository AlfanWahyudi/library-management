"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefBookLoan, 
  searchingItemsBookLoan, 
  getSearchItemsIdBookLoan,
} from "./column-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedListBookOnLoan } from "@/lib/http/book-loan-http"

export default function BookLoanDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    orderBy: 'created_at',
    orderDir: 'asc',
    fetchingData: getPaginatedListBookOnLoan,
    searchFields: getSearchItemsIdBookLoan(),
    columnsDef: columnsDefBookLoan,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsBookLoan} 
        table={table} 
      >
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}