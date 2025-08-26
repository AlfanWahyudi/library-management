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
export default function AuthorDataTable({}) {

  const router = useRouter()
  const params = useSearchParams()
  
  const search = params.get('search')
  console.log(search)
  
  useEffect(() => {
    const urlParam = new URLSearchParams()
    urlParam.set('page', 3)

    router.replace(`?${urlParam.toString()}`)
  }, [])

  const [data, setData] = useState([
    {
      id: 1,
      fullName: 'Asti Musman',
      nationality: 'Indonesia',
      activeSince: null,
      about: null,
      createdAt: '2025-06-05 15:50:01',
      updatedAt: '2025-06-05 15:50:01'
    },
    {
      id: 1,
      fullName: 'Wahidah Murriska',
      nationality: 'Indonesia',
      activeSince: null,
      about: 'Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada',
      createdAt: '2025-06-05 15:50:01',
      updatedAt: '2025-06-05 15:50:01'
    },
    {
      id: 1,
      fullName: 'Greg McKeown',
      nationality: 'Inggris',
      activeSince: null,
      about: null,
      createdAt: '2025-06-05 15:50:01',
      updatedAt: '2025-06-05 15:50:01'
    },
  ])

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