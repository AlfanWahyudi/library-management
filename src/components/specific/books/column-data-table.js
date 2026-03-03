'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ColHeader from "@/components/common/data-table/header/col-header";
import ActionFieldBook from "./action-field";
import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern";

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
        result = format(new Date(row.publicationDate), DATE_PATTERN.INDO_PRIMARY)
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
  columnHelper.accessor(row => `${row.updatedAt ? format(new Date(row.updatedAt), DATETIME_PATTERN.INDO_PRIMARY) : '-'}`, {
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