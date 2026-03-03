'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ColHeader from "@/components/common/data-table/header/col-header";
import { formatDate } from "@/lib/utils/date";
import { formatDateTime } from "@/lib/utils/datetime";
import ActionFieldBookLoan from "./action-field";

const columnHelper = createColumnHelper()

// TODO: ganti format tanggal nya, pake format indo
const columnsDefBookLoan = [
  columnHelper.accessor(row => row.memberFullName, {
    id: 'member_full_name',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Anggota' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.memberEmail, {
    id: 'member_email',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Email Anggota' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('bookTitle', {
    id: 'book_title',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Judul Buku' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.bookIsbn, {
    id: 'book_isbn',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='ISBN' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => formatDate({ date: row.startDate }), {
    id: 'start_date',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Mulai' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => formatDate({ date: row.endDate }), {
    id: 'end_date',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Selesai' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.createdAt ? formatDateTime({ datetime: new Date(row.createdAt) }) : '-'}`, {
    id: 'created_at',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Dibuat' />
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
      const bookLoan = row.original
      return <ActionFieldBookLoan bookLoan={bookLoan} />
    },
  })
]

const searchingItemsBookLoan = [
  {
    id: 'member_full_name',
    name: 'anggota'
  },
  {
    id: 'book_title',
    name: 'Judul buku'
  },
  {
    id: 'book_isbn',
    name: 'ISBN'
  },
]

const getSearchItemsIdBookLoan = (separator = ',') => searchingItemsBookLoan.map(item => item.id).join(separator)

const defaultColFiltersBookLoan = []

export {
  columnsDefBookLoan,
  searchingItemsBookLoan,
  getSearchItemsIdBookLoan,
  defaultColFiltersBookLoan
}