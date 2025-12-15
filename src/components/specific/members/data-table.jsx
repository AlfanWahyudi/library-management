"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefMember, 
  searchingItemsMember, 
  getSearchItemsIdMember,
  defaultColFiltersMember
} from "./column-data-table"
import { getPaginatedListMember } from "@/lib/http/member-http"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import MemberGenderFilter from "./gender-filter"
import { useEffect, useState } from "react"
import useServerSideFilterDataTable from "@/hooks/data-table/use-server-side-filter-data-table"

export default function MemberDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListMember,
    searchFields: getSearchItemsIdMember(),
    columnsDef: columnsDefMember,
    defaultColFilters: defaultColFiltersMember,
  })

  const { id: colGenderId, value: defaultGender } = defaultColFiltersMember[0]
  const { 
    colFilters, 
    filterReset, 
    resetFilter, 
    updateColFilters, 
    filtering 
  } = useServerSideFilterDataTable({ 
    table, 
    colFiltersVal: {gender: defaultGender} 
  })

  const isFilterChange = colFilters.gender !== defaultGender

  useEffect(() => {
    filtering()
  }, [colFilters.gender])

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsMember} 
        table={table} 
        onResetFilter={resetFilter} 
        isFilterChange={isFilterChange}
      >
        <MemberGenderFilter 
          defaultVal={defaultGender} 
          filterReset={filterReset}
          onChange={(val) => updateColFilters({colId: colGenderId, val})}
        />
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}