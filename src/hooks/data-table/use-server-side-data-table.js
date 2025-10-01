'use client'

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DATA_TABLE_PARAMS } from '@/lib/constants/data-table-params'

//TODO: bikin factory pattern nya dengan function aja untuk object defaultParamsVal 
export default function useServerSideDataTable({
  router,
  columnsDef,
  dataSource,
  metaSource,
  defaultParamsVal = {
    search: '', 
    searchFields: '',
    page: 0, 
    limit: 10, 
    orderBy: 'updated_at', 
    orderDir: 'desc'  
  },
  tanstackTableOpt = {},
}) {
  const searchParams = useSearchParams()

  const [searchFilter, setSearchFilter] = useState(searchParams.get(DATA_TABLE_PARAMS.SEARCH) || defaultParamsVal.search)

  const [pagination, setPagination] = useState({
    pageIndex: parseInt(searchParams.get(DATA_TABLE_PARAMS.PAGE)) || defaultParamsVal.page, //initial page index
    pageSize: parseInt(searchParams.get(DATA_TABLE_PARAMS.LIMIT)) || defaultParamsVal.limit, //default page size
  });

  const [sorting, setSorting] = useState([
    {
      id: searchParams.get(DATA_TABLE_PARAMS.ORDER_BY) || defaultParamsVal.orderBy,
      desc: searchParams.get(DATA_TABLE_PARAMS.ORDER_DIR) 
        ? searchParams.get(DATA_TABLE_PARAMS.ORDER_DIR).toLowerCase() === defaultParamsVal.orderDir
        : true,
    }
  ])

  const table = useReactTable({  
    data: [...dataSource],
    columns: columnsDef, 
    manualFiltering: true, //turn off client-side filtering
    manualPagination: true, //turn off client-side pagination
    manualSorting: true, //turn off client-side sorting
    getCoreRowModel: getCoreRowModel(),
    rowCount: metaSource.itemsCount, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchFilter,
    state: {
      pagination,
      sorting,
      globalFilter: searchFilter
    },
    ...tanstackTableOpt
  })

  useEffect(() => {
    const searchFields = searchParams.get(DATA_TABLE_PARAMS.SEARCH_FIELDS) || defaultParamsVal.searchFields

    const updatedParams = new URLSearchParams()
    updatedParams.set(DATA_TABLE_PARAMS.PAGE, pagination.pageIndex)
    updatedParams.set(DATA_TABLE_PARAMS.LIMIT, pagination.pageSize)
    updatedParams.set(DATA_TABLE_PARAMS.SEARCH, searchFilter)
    updatedParams.set(DATA_TABLE_PARAMS.SEARCH_FIELDS, searchFields)
    updatedParams.set(DATA_TABLE_PARAMS.ORDER_BY, sorting[0].id)
    updatedParams.set(DATA_TABLE_PARAMS.ORDER_DIR, sorting[0].desc ? 'desc' : 'asc')

    // adding other params
    for (const [key, value] of searchParams.entries()) {
      if (
        key !== DATA_TABLE_PARAMS.PAGE &&
        key !== DATA_TABLE_PARAMS.LIMIT &&
        key !== DATA_TABLE_PARAMS.SEARCH &&
        key !== DATA_TABLE_PARAMS.ORDER_BY &&
        key !== DATA_TABLE_PARAMS.ORDER_DIR
      ) {
        updatedParams.set(key, value)
      }
    }

    router.replace(`?${updatedParams.toString()}`) //update current url
  }, [router, defaultParamsVal.searchFields, searchFilter, pagination, sorting, searchParams])


  return {
    searchParams,
    table,
    pagination,
    sorting,
    searchFilter,
    defaultParamsVal
  }
}