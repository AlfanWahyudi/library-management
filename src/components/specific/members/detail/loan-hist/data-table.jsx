"use client"

import DataTable from "@/components/common/data-table/data-table-main"
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table"
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table"
import { 
  colsDefMemberLoanHist,
  getSearchItemsId,
  searchingItems
} from "./column-data-table"
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table"
import { getPaginatedHistBookLoan } from "@/lib/http/book-loan-http"

const getColsDef = () => {
  return colsDefMemberLoanHist.setDefaultCols().get()
}

export default function MemberLoanHistDataTable({ memberId }) {
  const {
    error,
    isPending,
    table,
  } = useServerSideDataTable({
    fetchingData: getPaginatedHistBookLoan,
    searchFields: getSearchItemsId(),
    columnsDef: getColsDef(),
    otherQueryParam: { memberId: memberId },
    orderBy: 'finished_date',
    orderDir: 'desc'
  })

  return (
    <WrapperDataTable>
      <FilterWrapperDataTable 
        searchingFieldItems={searchingItems} 
        table={table} 
      >
      </FilterWrapperDataTable>
      <DataTable table={table} isPending={isPending} error={error} />
    </WrapperDataTable>
  )
}