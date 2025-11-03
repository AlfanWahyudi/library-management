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
  orderDir = 'desc' 
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
    state: {
      pagination,
      sorting,
      globalFilter: searchFilter
    },
    ...otherTanStackProps
  })

  const resetToDefault = () => {
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
  }

  useEffect(() => {
    const startFetching = async () => {
      const authorParam = {
        searchFields: searchFields,
        page: pagination.pageIndex,
        limit: pagination.pageSize,
        search: searchFilter,
        orderBy: sorting[0].id,
        orderDir: sorting[0].desc ? 'desc' : 'asc', 
      }

      await runFetch({ 
        fetchFn: async() => await fetchingData(authorParam)
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

  }, [searchFilter, pagination, sorting, isTableRefreshed])

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