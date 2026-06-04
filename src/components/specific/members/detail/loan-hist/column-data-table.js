'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ColHeader from "@/components/common/data-table/header/col-header";
import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern";

const columnHelper = createColumnHelper()

const columnsDefMemberLoanHist = [
  columnHelper.accessor(row => format(new Date(row.finishedDate), DATETIME_PATTERN.INDO_PRIMARY), {
    id: 'finished_date',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Pengembalian' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.bookTitle, {
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
]

const searchingItems = [
  {
    id: 'book_title',
    name: 'Judul Buku'
  },
  {
    id: 'book_isbn',
    name: 'ISBN'
  },
]

const getSearchItemsId = (separator = ',') => searchingItems.map(item => item.id).join(separator)

const defaultColFilters = []

export {
  columnsDefMemberLoanHist,
  searchingItems,
  getSearchItemsId,
  defaultColFilters
}