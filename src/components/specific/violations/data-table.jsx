"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefViolation, 
  searchingItemsViolation, 
  getSearchItemsIdViolation,
  defaultColFiltersViolation
} from "./column-data-table"
import { getPaginatedListViolation } from "@/lib/http/violation-http"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"

export default function ViolationDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListViolation,
    searchFields: getSearchItemsIdViolation(),
    columnsDef: columnsDefViolation,
    defaultColFilters: defaultColFiltersViolation,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsViolation} 
        table={table} 
      >
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}