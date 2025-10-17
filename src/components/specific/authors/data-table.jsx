"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  columnsDefAuthor, 
  searchingItemsAuthor, 
  getSearchItemsIdAuthor 
} from "./column-data-table"
import { getPaginatedListAuthor } from "@/lib/http/author-http"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"

//TODO: Tampilan Tamble bikin rapih
export default function AuthorDataTable() {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedListAuthor,
    searchFields: getSearchItemsIdAuthor(),
    columnsDef: columnsDefAuthor,
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable searchingFieldItems={searchingItemsAuthor} table={table}>
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}