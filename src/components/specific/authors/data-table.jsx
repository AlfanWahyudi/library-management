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
//TODO: tambahkan UI kondisi sendang panding fetching data nya
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
      {!error && <DataTable table={table} />}
      {/* //TODO: buat component untuk menampilkan pesan error nya */}
      {error && <h1>Error menampilkan data nya nih hadehh. Coba lagi nanti yaaa</h1>}
    </WrapperDataTable>
  )
}