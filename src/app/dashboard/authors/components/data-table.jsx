"use client"

import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import DataTable from "@/components/data-table/data-table-main";
import FilterWrapperDataTable from "@/components/data-table/filter-wrapper-data-table";
import { useRouter } from "next/navigation";
import SortIndicatorTable from "@/components/data-table/sort-indicator-table";
import useServerSideDataTable from "@/hooks/data-table/use-server-side-data-table";

const columnHelper = createColumnHelper()

const columnsDef = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Nama Lengkap'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.country.name, {
    id: 'country_name',
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
  {
    id: 'country_name',
    name: 'Kebangsaan'
  },
]

//TODO: Tampilan Tamble bikin rapih
//TODO: rapihkan codingannya
export default function AuthorDataTable({ authorItemsPaginated }) {
  const { data: authorData, meta: authorMeta } = authorItemsPaginated

  const {
    table: authorTable
  } = useServerSideDataTable({
    router: useRouter(),
    columnsDef,
    metaSource: authorMeta,
    dataSource: authorData,
    defaultParamsVal: {
      search: '', 
      searchFields: searchingFieldItems.map(item => item.id).join(','),
      page: 0, 
      limit: 10, 
      orderBy: 'updated_at', 
      orderDir: 'desc'  
    },
  })

  return (
    <section className="grid">
      <FilterWrapperDataTable searchingFieldItems={searchingFieldItems} table={authorTable}>
      </FilterWrapperDataTable>
      <DataTable table={authorTable} />
    </section>
  )
}