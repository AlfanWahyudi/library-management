'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import ActionFieldAuthor from "./action-field";
import ColHeader from "@/components/common/data-table/header/col-header";
import { format } from "date-fns";
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern";

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
  columnHelper.accessor(row => `${row.createdAt ? format(new Date(row.createdAt), DATETIME_PATTERN.INDO_PRIMARY) : '-'}`, {
    id: 'created_at',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Tanggal Dibuat' />
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