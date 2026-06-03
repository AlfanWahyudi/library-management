"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedHistBookLoan } from "@/lib/http/book-loan-http"
import { columnsDefBookLoanHist, getSearchItemsIdBookLoanHist, searchingItemsBookLoanHist } from "./column-data-table"

export default function BookLoanHistDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    orderBy: 'finished_date',
    orderDir: 'desc',
    fetchingData: getPaginatedHistBookLoan,
    searchFields: getSearchItemsIdBookLoanHist(),
    columnsDef: columnsDefBookLoanHist,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsBookLoanHist} 
        table={table} 
      >
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}