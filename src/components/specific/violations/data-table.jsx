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
import useServerSideFilterDataTable from "@/hooks/data-table/use-server-side-filter-data-table"
import { useEffect } from "react"
import ViolationLevelFilter from "./level-filter"

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

  const { id: colLevelId, value: defaultLevel } = defaultColFiltersViolation[0]
  const {
    colFilters, 
    filterReset, 
    resetFilter, 
    updateColFilters, 
    filtering 
  } = useServerSideFilterDataTable({ 
    table, 
    colFiltersVal: {level: defaultLevel} 
  })

  const isFilterChange = colFilters.level !== defaultLevel

  useEffect(() => {
    filtering()
  }, [colFilters.level])

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsViolation} 
        table={table} 
        onResetFilter={resetFilter} 
        isFilterChange={isFilterChange}
      >
        <ViolationLevelFilter 
          defaultVal={defaultLevel}
          filterReset={filterReset}
          onChange={(val) => updateColFilters({ colId: colLevelId, val })}
        />
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}