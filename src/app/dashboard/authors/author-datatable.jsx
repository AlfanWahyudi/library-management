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
import AppDataTable from "@/components/datatable/app-data-table";
import AppFilterDataTable from "@/components/datatable/app-filter-data-table";
import { useRouter, useSearchParams } from "next/navigation";



const columnHelper = createColumnHelper()

const columnsDef = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: () => 'Nama Lengkap',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.nationality || '-'}`, {
    id: 'nationality',
    header: () => 'Kebangsaan',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.activeSince || '-'}`, {
    id: 'active_since',
    header: () => 'Aktif Sejak',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.about || '-'}`, {
    id: 'about',
    header: () => 'Tentang',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${new Date(row.createdAt).toISOString() || '-'}`, {
    id: 'created_at',
    header: () => 'Dibuat Tanggal',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${new Date(row.updatedAt).toISOString() || '-'}`, {
    id: 'updated_at',
    header: () => 'Diperbaharui Tanggal',
    
    cell: props => props.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Aksi',
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


//TODO: Pahami penggunaan TanStack Table library nya. pahami bagian yang utama aja, sesuai dengan yg ingin dibikin
//TODO: buat tampilan dan harus berfungsi ya. 
//TODO: Untuk filtering, paginasi, searching, nampilin jumlah data, dan sorting column nya. 
//TODO: Tampilan Tamble bikin rapih
//TODO: rapihkan codingannya
export default function AuthorDataTable({ authorItemsPaginated }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: authorData, meta: authorMeta } = authorItemsPaginated

  const [tableOpt, setTableOpt] = useState({
    search: searchParams.get('search') || '',
    orderBy: searchParams.get('orderBy') || 'updated_at',
    orderDir: searchParams.get('orderDir') || 'desc',
  })

  const [pagination, setPagination] = useState({
    pageIndex: parseInt(searchParams.get('page')) || 0, //initial page index
    pageSize: parseInt(searchParams.get('limit')) || 10, //default page size
  });


  const table = useReactTable({  
    data: [...authorData],
    columns: columnsDef, 
    manualFiltering: true, //turn off client-side filtering
    manualPagination: true, //turn off client-side pagination
    manualSorting: true, //turn off client-side sorting
    getCoreRowModel: getCoreRowModel(),
    rowCount: authorMeta.itemsCount, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination,
    },
  })

  useEffect(() => {
    const updatedParams = new URLSearchParams()
    updatedParams.set('page', pagination.pageIndex)
    updatedParams.set('limit', pagination.pageSize)
    updatedParams.set('search', tableOpt.search)
    updatedParams.set('orderBy', tableOpt.orderBy)
    updatedParams.set('orderDir', tableOpt.orderDir)

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
  }, [tableOpt, pagination, searchParams])

  return (
    <section id="pengarang-content">
      <AppFilterDataTable>
      </AppFilterDataTable>
      <AppDataTable table={table} />
    </section>
  )
}