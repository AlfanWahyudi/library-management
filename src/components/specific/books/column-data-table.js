'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import { formatDateTime } from "@/lib/utils/datetime";
import ColHeader from "@/components/common/data-table/header/col-header";
import ActionFieldBook from "./action-field";
import { formatDate } from "@/lib/utils/date";

const columnHelper = createColumnHelper()

const columnsDefBook = [
  columnHelper.accessor('title', {
    id: 'title',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Judul' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('isbn', {
    id: 'isbn',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='ISBN' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.edition || '-'}`, {
    id: 'edition',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Edisi' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(
    (row) => {
      let result = '-'

      if (row.publicationDate) {
        result = formatDate({ date: new Date(row.publicationDate), pattern: 'dd/MM/yyyy' })
      }

      return result
    }, 
    {
      id: 'publication_date',
      header: ({ column }) => (
        <ColHeader>
          <ColSortingHeader column={column} headerName='Tanggal Publikasi' />
        </ColHeader>
      ),
      cell: props => props.getValue(),
    }
  ),
  columnHelper.accessor(row => `${row.page || '-'}`, {
    id: 'page',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Halaman' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.language || '-'}`, {
    id: 'language',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Bahasa' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.updatedAt ? formatDateTime({ datetime: new Date(row.updatedAt) }) : '-'}`, {
    id: 'updated_at',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Diperbaharui' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => (
      <ColHeader className='text-center'>Aksi</ColHeader>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const book = row.original
      return <ActionFieldBook book={book} />
    },
  })
]

const searchingItemsBook = [
  {
    id: 'title',
    name: 'Judul'
  },
  {
    id: 'isbn',
    name: 'ISBN'
  },
]

const getSearchItemsIdBook = (separator = ',') => searchingItemsBook.map(item => item.id).join(separator)

const defaultColFiltersBook = []

export {
  columnsDefBook,
  searchingItemsBook,
  getSearchItemsIdBook,
  defaultColFiltersBook
}