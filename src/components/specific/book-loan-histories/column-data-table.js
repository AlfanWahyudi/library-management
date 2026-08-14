'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ColHeader from "@/components/common/data-table/header/col-header";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import { format } from "date-fns";
import ActionFieldBookLoanHist from "./action-field";
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern";

const columnHelper = createColumnHelper()

const colsBookLoanHist = {
  items: [],

  setDefaultCols() {
    this.items = [
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
      columnHelper.accessor(row => format(new Date(row.startDate), DATE_PATTERN.INDO_PRIMARY), {
        id: 'start_date',
        header: ({ column }) => (
          <ColHeader>
            <ColSortingHeader column={column} headerName='Tanggal Mulai' />
          </ColHeader>
        ),
        cell: props => props.getValue(),
      }),
      columnHelper.accessor(row => format(new Date(row.endDate), DATE_PATTERN.INDO_PRIMARY), {
        id: 'end_date',
        header: ({ column }) => (
          <ColHeader>
            <ColSortingHeader column={column} headerName='Tanggal Selesai' />
          </ColHeader>
        ),
        cell: props => props.getValue(),
      }),
      columnHelper.accessor(row => format(new Date(row.finishedDate), DATETIME_PATTERN.INDO_PRIMARY), {
        id: 'finished_date',
        header: ({ column }) => (
          <ColHeader>
            <ColSortingHeader column={column} headerName='Tanggal Pengembalian' />
          </ColHeader>
        ),
        cell: props => props.getValue(),
      })
    ]

    return this
  },

  addActionCol() {
    this.items.push(
      columnHelper.display({
        id: 'actions',
        header: () => (
          <ColHeader className='text-center'>Aksi</ColHeader>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const bookLoanHist = row.original
          return <ActionFieldBookLoanHist bookLoanHist={bookLoanHist} />
        },
      })
    )

    return this
  },

  get() {
    return this.items
  }
}

const searchingItemsBookLoanHist = [
  {
    id: 'member_full_name',
    name: 'Anggota'
  },
  {
    id: 'member_email',
    name: 'Email Anggota'
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

const getSearchItemsIdBookLoanHist = (separator = ',') => searchingItemsBookLoanHist.map(item => item.id).join(separator)

const defaultColFiltersBookLoanHist = []

export {
  colsBookLoanHist,
  searchingItemsBookLoanHist,
  getSearchItemsIdBookLoanHist,
  defaultColFiltersBookLoanHist
}