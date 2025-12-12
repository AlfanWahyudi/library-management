"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefMember, 
  searchingItemsMember, 
  getSearchItemsIdMember 
} from "./column-data-table"
import { getPaginatedListMember } from "@/lib/http/member-http"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"

export default function MemberDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListMember,
    searchFields: getSearchItemsIdMember(),
    columnsDef: columnsDefMember,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable searchingFieldItems={searchingItemsMember} table={table}>
        
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}