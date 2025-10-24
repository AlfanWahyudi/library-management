'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import { formatDateTime } from "@/lib/utils/datetime";
import ActionFieldAuthor from "./action-field";
import ColHeader from "@/components/common/data-table/header/col-header";

const columnHelper = createColumnHelper()

const columnsDefAuthor = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Nama Lengkap' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.country.name, {
    id: 'country_name',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Kebangsaan' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.activeSince || '-'}`, {
    id: 'active_since',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Aktif Sejak' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.about || '-'}`, {
    id: 'about',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tentang' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${formatDateTime({ datetime: new Date(row.createdAt) })  || '-'}`, {
    id: 'created_at',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Dibuat' />
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
      const author = row.original
      return <ActionFieldAuthor author={author} />
    },
  })
]

const searchingItemsAuthor = [
  {
    id: 'full_name',
    name: 'Nama Lengkap'
  },
  {
    id: 'country_name',
    name: 'Kebangsaan'
  },
]

const getSearchItemsIdAuthor = (separator = ',') => searchingItemsAuthor.map(item => item.id).join(separator)

export {
  columnsDefAuthor,
  searchingItemsAuthor,
  getSearchItemsIdAuthor
}