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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
          <section className="mb-7">
            <section className="mb-4 flex gap-3 justify-between">
              <Input className="w-100" placeholder="Cari data..." />
              <Button>Download PDF</Button>
            </section>
            <section className="flex justify-between">
              <article className="flex text-sm flex-wrap gap-3">
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Nama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Kebangsaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Kebangsaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Kebangsaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </article>
              <Button variant='destructive' disabled>Hapus Filter</Button>
            </section>
          </section>
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
          <article className="flex justify-between py-4">
            <section className="flex text-sm items-center gap-3">
              <p>Rows per page</p>
              <Select>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p>1-10 of 20</p>
            </section>
            <Pagination className="m-0 w-fit">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">7</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </article>
        </section>
      </section>
    </>
  )
}