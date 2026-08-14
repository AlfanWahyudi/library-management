"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  colDefBookLoan,
  searchingItemsBookLoan, 
  getSearchItemsIdBookLoan,
} from "./column-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedListBookOnLoan } from "@/lib/http/book-loan-http"


const getColsDef = ({ canOpenComplete }) => {
  const colDefInit = colDefBookLoan.setDefaultCols()

  const displayActionCol = canOpenComplete
  if (displayActionCol) {
    colDefInit.addActionCol({ showCompleteBtn: canOpenComplete })
  }

  return colDefInit.get()
}

export default function BookLoanDataTable({ canOpenComplete = true }) {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    orderBy: 'created_at',
    orderDir: 'desc',
    fetchingData: getPaginatedListBookOnLoan,
    searchFields: getSearchItemsIdBookLoan(),
    columnsDef: getColsDef({canOpenComplete}),
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