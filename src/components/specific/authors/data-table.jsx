"use client"

import DataTable from "@/components/common/data-table/data-table-main";
import FilterWrapperDataTable from "@/components/common/data-table/filter-wrapper-data-table";
import WrapperDataTable from "@/components/common/data-table/wrapper-data-table";
import { 
  columnsDefAuthor, 
  searchingItemsAuthor, 
  getSearchItemsIdAuthor 
} from "./column-data-table";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { getPaginatedListAuthor } from "@/lib/http/author-http";

const defaultParam = {
  page: 0,
  limit: 10,
  search: '',
  searchFields: getSearchItemsIdAuthor(),
  orderBy: 'updated_at', 
  orderDir: 'desc'  
}

//TODO: Tampilan Tamble bikin rapih
//TODO: coba pikirin lagi bagus nya gimana untuk searching apakah harus sesuai dengan page yang sedang dibuka, atau bisa search ke semua data tanpa harus ada batasan seperti page, dll. 
//TODO: bikin hook nya untuk handle serverside datatable
export default function AuthorDataTable() {
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

  const [searchFilter, setSearchFilter] = useState(defaultParam.search)
  const [pagination, setPagination] = useState({
    pageIndex: defaultParam.page,
    pageSize: defaultParam.limit
  })
  const [sorting, setSorting] = useState([
    {
      id: defaultParam.orderBy,
      desc: defaultParam.orderDir.toLowerCase() === 'desc',
    }
  ])

  const table = useReactTable({  
    data: [...fetchedData.data],
    columns: columnsDefAuthor, 
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
    }
  })

  useEffect(() => {
    const fetchingData = async () => {
      const authorParam = {
        ...defaultParam,
        page: pagination.pageIndex,
        limit: pagination.pageSize,
        search: searchFilter,
        orderBy: sorting[0].id,
        orderDir: sorting[0].desc ? 'desc' : 'asc', 
      }

      await runFetch({ 
        fetchFn: async() => await getPaginatedListAuthor(authorParam) 
      })
    }

    fetchingData()
  }, [defaultParam, searchFilter, pagination, sorting])

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