"use client"

import DataTable from "@/components/common/data-table/data-table-main";
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table";
import { useRouter } from "next/navigation";
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table";
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table";
import { 
  columnsDefAuthor, 
  searchingItemsAuthor, 
  getSearchItemsIdAuthor 
} from "./column-data-table";

//TODO: Tampilan Tamble bikin rapih
export default function AuthorDataTable({ authorItemsPaginated }) {
  const { data: authorData, meta: authorMeta } = authorItemsPaginated

  const {
    table: authorTable
  } = useServerSideDataTable({
    router: useRouter(),
    columnsDef: columnsDefAuthor,
    metaSource: authorMeta,
    dataSource: authorData,
    defaultParamsVal: {
      search: '', 
      searchFields: getSearchItemsIdAuthor(),
      page: 0, 
      limit: 10, 
      orderBy: 'updated_at', 
      orderDir: 'desc'  
    },
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable searchingFieldItems={searchingItemsAuthor} table={authorTable}>
      </FilterWrapperDataTable>
      <DataTable table={authorTable} />
    </WrapperDataTable>
  )
}