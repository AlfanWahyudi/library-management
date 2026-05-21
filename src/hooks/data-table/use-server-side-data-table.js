'use client'

import { useContext, useEffect, useState } from "react"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import useFetch from "../use-fetch"
import { DataTableContext } from "@/store/data-table-context"

export default function useServerSideDataTable({ 
  fetchingData,
  columnsDef,
  otherTanStackProps = {},
  page = 0, 
  limit = 10, 
  search = '', 
  searchFields = '', 
  orderBy = 'updated_at', 
  orderDir = 'desc',
  defaultColFilters = [], 
}) {
  const {
    error,
    fetchedData,
    isPending,
    reset,
    runFetch,
  } = useFetch({ 
    initialValue: { 
      data: [], 
      meta: {
        page: 0,
        limit: 0,
        dataCount: 0,
        pageCount: 0,
        itemsCount: 0,
      } 
    } 
  })

  const { isTableRefreshed, stopRefreshTable } = useContext(DataTableContext)
  const [searchFilter, setSearchFilter] = useState(search)
  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: limit
  })
  const [sorting, setSorting] = useState([
    {
      id: orderBy,
      desc: orderDir.toLowerCase() === 'desc',
    }
  ])
  // TODO: test column filters nya lebih dari 2 columns
  const [colFilters, setColFilters] = useState(defaultColFilters)

  const table = useReactTable({  
    data: [...fetchedData.data],
    columns: columnsDef, 
    manualFiltering: true, //turn off client-side filtering
    manualPagination: true, //turn off client-side pagination
    manualSorting: true, //turn off client-side sorting
    getCoreRowModel: getCoreRowModel(),
    rowCount: fetchedData.meta.itemsCount, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchFilter,
    onColumnFiltersChange: setColFilters,
    state: {
      pagination,
      sorting,
      globalFilter: searchFilter
    },
    ...otherTanStackProps
  })

  const resetToDefault = () => {
    /* 
      - reset state dengan table API -
      coba test aja

      table.reset()
    */
    setSearchFilter(search)
    setPagination({
      pageIndex: page,
      pageSize: limit
    })
    setSorting([
      {
        id: orderBy,
        desc: orderDir.toLowerCase() === 'desc',
      }
    ])
    setColFilters(defaultColFilters)
  }

  useEffect(() => {
    const startFetching = async () => {
      const queryParam = {
        searchFields: searchFields,
        page: pagination.pageIndex,
        limit: pagination.pageSize,
        search: searchFilter,
        orderBy: sorting[0].id,
        orderDir: sorting[0].desc ? 'desc' : 'asc', 
      }

      colFilters.forEach((colFilter) => {
        queryParam[colFilter.id] = colFilter.value
      })

      await runFetch({ 
        fetchFn: async() => await fetchingData(queryParam)
      })
    }

    startFetching()

    if (isTableRefreshed) {
      resetToDefault()
    }

    return () => {
      if (isTableRefreshed) {
        stopRefreshTable()
      }
    }

  }, [searchFilter, pagination, sorting, isTableRefreshed, colFilters])

  return {
    table,
    error,
    isPending,
    fetchedData,
    searchFilter,
    pagination,
    sorting,
    setSorting,
    setPagination,
    reset,
    setSearchFilter,
  }
}