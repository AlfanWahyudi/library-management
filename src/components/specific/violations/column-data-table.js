'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ColHeader from "@/components/common/data-table/header/col-header";
import ActionFieldViolation from "./action-field";
import { formatDateTime } from "@/lib/utils/datetime";


const columnHelper = createColumnHelper()

const columnsDefViolation = [
  columnHelper.accessor('title', {
    id: 'title',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Nama' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('level', {
    id: 'level',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Level' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${formatDateTime({ datetime: new Date(row.updatedAt) })  || '-'}`, {
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
      const violation = row.original
      return <ActionFieldViolation violation={violation}></ActionFieldViolation>
    },
  })
]

const searchingItemsViolation = [
  {
    id: 'title',
    name: 'Nama'
  },
]

const getSearchItemsIdViolation = (separator = ',') => searchingItemsViolation.map(item => item.id).join(separator)

const defaultColFiltersViolation = [
]

export {
  columnsDefViolation,
  searchingItemsViolation,
  getSearchItemsIdViolation,
  defaultColFiltersViolation
}