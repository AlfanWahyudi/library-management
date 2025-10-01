'use client';

import { createColumnHelper } from "@tanstack/react-table";

import SortIndicatorTable from "@/components/data-table/sort-indicator-table";
import { formatDateTime } from "@/lib/utils/datetime";
import ActionFieldAuthor from "./action-field";


const columnHelper = createColumnHelper()


const columnsDefAuthor = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Nama Lengkap'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.country.name, {
    id: 'country_name',
    header: () => 'Kebangsaan',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Kebangsaan'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.activeSince || '-'}`, {
    id: 'active_since',
    header: () => 'Aktif Sejak',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Aktif Sejak'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.about || '-'}`, {
    id: 'about',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tentang'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${formatDateTime({ datetime: new Date(row.createdAt) })  || '-'}`, {
    id: 'created_at',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tanggal Dibuat'}),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${formatDateTime({ datetime: new Date(row.updatedAt) })  || '-'}`, {
    id: 'updated_at',
    header: ({ column }) => SortIndicatorTable({column, headerName: 'Tanggal Diperbaharui'}),
    cell: props => props.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => 'Aksi',
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