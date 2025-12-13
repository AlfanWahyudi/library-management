"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefMember, 
  searchingItemsMember, 
  getSearchItemsIdMember,
  defaultColFilters
} from "./column-data-table"
import { getPaginatedListMember } from "@/lib/http/member-http"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import MemberGenderFilter from "./gender-filter"
import { useEffect, useState } from "react"

export default function MemberDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListMember,
    searchFields: getSearchItemsIdMember(),
    columnsDef: columnsDefMember,
    defaultColFilters,
  })

  const { id: colGenderId, value: defaultGender } = defaultColFilters[0]

  const [colFilters, setColFilters] = useState({
    gender: defaultGender,
  })

  const [filterReset, setFilterReset] = useState(false)

  const resetFilter = () => {
    setFilterReset(true)
  }

  const keepFilter = () => {
    setFilterReset(false)
  }

  const updateColFilters = ({colId, val}) => {
    setColFilters((prev) => ({...prev, [colId]: val}))
  }

  const isFilterChange = colFilters.gender !== defaultGender

  useEffect(() => {
    const filtering = () => {
      const gender = colFilters.gender
      const genderCol = table.getColumn(colGenderId)
      genderCol.setFilterValue(gender)
    }

    filtering()
    keepFilter()
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