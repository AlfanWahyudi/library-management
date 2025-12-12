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
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem, SelectLabel } from "@/components/ui/select"
import { useEffect, useState } from "react"


// TODO: cleaning code untuk filtering nya
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

  const defaultGender = defaultColFilters[0].value
  const [gender, setGender] = useState(defaultGender)

  useEffect(() => {
    const genderCol = table.getColumn('gender')
    genderCol.setFilterValue(gender)
  }, [gender])

  const resetFilter = () => {
    setGender(defaultGender)
  }

  const isFilterChange = gender !== defaultGender

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItemsMember} 
        table={table} 
        onResetFilter={resetFilter} 
        isFilterChange={isFilterChange}
      >
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="min-w-[130px]">
            <SelectValue placeholder='Jenis kelamin'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Jenis kelamin</SelectLabel>
              <SelectItem value='all'>Semua</SelectItem>
              <SelectItem value='m'>Laki-Laki</SelectItem>
              <SelectItem value='f'>Perempuan</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}