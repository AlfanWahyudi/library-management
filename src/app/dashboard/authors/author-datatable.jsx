"use client"


import { Button } from "@/components/ui/button";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
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

const defaultColumns = [
  columnHelper.accessor('fullName', {
    header: () => 'Nama Lengkap',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('nationality', {
    header: () => 'Kebangsaan',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('activeSince', {
    header: () => 'Aktif Sejak',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('about', {
    header: () => 'Tentang',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Dibuat Tanggal',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('updatedAt', {
    header: () => 'Diperbaharui Tanggal',
    cell: info => info.getValue(),
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
// Untuk filtering, paginasi, searching, nampilin jumlah data, dan sorting column nya. 
// Tampilan bikin rapih
export default function AuthorDataTable({ authorItemsPaginated }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tableOpt, setTableOpt] = useState({
    page: parseInt(searchParams.get('page')) || 1,
    limit: parseInt(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    orderBy: searchParams.get('orderBy') || 'updated_at',
    orderDir: searchParams.get('orderDir') || 'desc',
  })

  useEffect(() => {
    const updatedParams = new URLSearchParams()
    updatedParams.set('page', tableOpt.page)
    updatedParams.set('limit', tableOpt.limit)
    updatedParams.set('search', tableOpt.search)
    updatedParams.set('orderBy', tableOpt.orderBy)
    updatedParams.set('orderDir', tableOpt.orderDir)

    // adding other params
    for (const [key, value] of searchParams.entries()) {
      if (
        key !== 'page' ||
        key !== 'limit' ||
        key !== 'search' ||
        key !== 'orderBy' ||
        key !== 'orderDir'
      ) {
        updatedParams.set(key, value)
      }
    }

    router.replace(`?${updatedParams.toString()}`) //update current url

  }, [tableOpt])

  const [data, setData] = useState([...authorItemsPaginated.data])

  const [columns] = useState([...defaultColumns])

  const table = useReactTable({  
    data,
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: 50,
      minSize: 50,
      maxSize: 150,
    },
  })

  return (
    <section id="pengarang-content">
      <AppFilterDataTable>
      </AppFilterDataTable>
      <AppDataTable table={table} />
    </section>
  )
}