"use client"

import { Button } from "@/components/ui/button";
import DashHeader from "../components/dash-header";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const breadcrumbItems = [
  {
    path: '/dashboard',
    name: 'Home'
  },
  {
    name: 'Pengarang'
  }
]

const rightContentItem = (
  <>
    <Button variant='outline'>Tambah pengarang</Button>
  </>
)

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
//TODO: terakhir buatkan datable ini ke dalam component terpisah
export default function PengarangPage() {
  const [authors, setAuthors] = useState([
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

  const table = useReactTable({ 
    columns: defaultColumns, 
    data: authors,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <h1 className="sr-only">Halaman Pengarang</h1>
      <DashHeader 
        breadcrumbItems={breadcrumbItems} 
        pageTitle='Pengarang'
        rightContentItem={rightContentItem}
      />
      <section id="pengarang-content">
        <section id="pengarang-data-table">
          <article className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length 
                  ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={defaultColumns.length} className='h-24 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </article>
          <article className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </article>
        </section>
      </section>
    </>
  )
}