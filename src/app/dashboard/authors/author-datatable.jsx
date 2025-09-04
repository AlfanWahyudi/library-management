"use client"

import { Button } from "@/components/ui/button";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import DataTable from "@/components/data-table";
import FilterWrapperDataTable from "@/components/data-table/filter-wrapper-data-table";
import { useRouter, useSearchParams } from "next/navigation";
import SortIndicatorTable from "@/components/data-table/sort-indicator-table";

const columnHelper = createColumnHelper()

const columnsDef = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Nama Lengkap'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.nationality || '-'}`, {
    id: 'nationality',
    header: () => 'Kebangsaan',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Kebangsaan'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.activeSince || '-'}`, {
    id: 'active_since',
    header: () => 'Aktif Sejak',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Aktif Sejak'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.about || '-'}`, {
    id: 'about',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tentang'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${new Date(row.createdAt).toISOString() || '-'}`, {
    id: 'created_at',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tanggal Dibuat'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${new Date(row.updatedAt).toISOString() || '-'}`, {
    id: 'updated_at',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tanggal Diperbaharui'}),
    cell: props => props.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Aksi',
    enableSorting: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  })
]


const searchingFieldItems = [
  {
    id: 'full_name',
    name: 'Nama Lengkap'
  },
]

//TODO: bikin state management baru dengan redux, biar codingan jadi rapih
//TODO: Tampilan Tamble bikin rapih
//TODO: rapihkan codingannya
export default function AuthorDataTable({ authorItemsPaginated }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: authorData, meta: authorMeta } = authorItemsPaginated

  const [searchFilter, setSearchFilter] = useState(searchParams.get('search') || '')

  const [pagination, setPagination] = useState({
    pageIndex: parseInt(searchParams.get('page')) || 0, //initial page index
    pageSize: parseInt(searchParams.get('limit')) || 10, //default page size
  });

  const [sorting, setSorting] = useState([
    {
      id: searchParams.get('orderBy') || 'updated_at',
      desc: searchParams.get('orderDir') 
        ? searchParams.get('orderDir').toLowerCase() === 'desc'
        : true,
    }
  ])

  const table = useReactTable({  
    data: [...authorData],
    columns: columnsDef, 
    manualFiltering: true, //turn off client-side filtering
    manualPagination: true, //turn off client-side pagination
    manualSorting: true, //turn off client-side sorting
    getCoreRowModel: getCoreRowModel(),
    rowCount: authorMeta.itemsCount, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchFilter,
    state: {
      pagination,
      sorting,
      globalFilter: searchFilter
    },
  })

  useEffect(() => {
    const updatedParams = new URLSearchParams()
    updatedParams.set('page', pagination.pageIndex)
    updatedParams.set('limit', pagination.pageSize)
    updatedParams.set('search', searchFilter)
    updatedParams.set('searchFields', searchingFieldItems.map(item => item.id).join(','))
    updatedParams.set('orderBy', sorting[0].id)
    updatedParams.set('orderDir', sorting[0].desc ? 'desc' : 'asc')

    // adding other params
    for (const [key, value] of searchParams.entries()) {
      if (
        key !== 'page' &&
        key !== 'limit' &&
        key !== 'search' &&
        key !== 'orderBy' &&
        key !== 'orderDir'
      ) {
        updatedParams.set(key, value)
      }
    }

    router.replace(`?${updatedParams.toString()}`) //update current url
  }, [searchFilter, pagination, sorting, searchParams])

  return (
    <section id="pengarang-content">
      <FilterWrapperDataTable searchingFieldItems={searchingFieldItems} table={table}>
      </FilterWrapperDataTable>
      <DataTable table={table} />
    </section>
  )
}