'use client';

import { createColumnHelper } from "@tanstack/react-table";

import ColSortingHeader from "@/components/common/data-table/header/col-sorting-header";
import { formatDateTime } from "@/lib/utils/datetime";
import ColHeader from "@/components/common/data-table/header/col-header";
import ActionFieldMember from "./action-field";
import { GENDER } from "@/lib/constants/gender";

const columnHelper = createColumnHelper()

const columnsDefMember = [
  columnHelper.accessor('fullName', {
    id: 'full_name',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Nama Lengkap' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => row.email, {
    id: 'email',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Email' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${row.phone || '-'}`, {
    id: 'phone',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Nomor HP' />
      </ColHeader>
    ),
    cell: props => props.getValue(),
  }),
  columnHelper.accessor(row => `${GENDER[row.gender] || '-'}`, {
    id: 'gender',
    header: ({ column }) => (
      <ColHeader>
        <ColSortingHeader column={column} headerName='Jenis Kelamin' />
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
      const member = row.original
      return <ActionFieldMember member={member} />
    },
  })
]

const searchingItemsMember = [
  {
    id: 'full_name',
    name: 'Nama Lengkap'
  },
]

const getSearchItemsIdMember = (separator = ',') => searchingItemsMember.map(item => item.id).join(separator)

const defaultColFiltersMember = [
  {
    id: 'gender',
    value: 'all'
  },
]

export {
  columnsDefMember,
  searchingItemsMember,
  getSearchItemsIdMember,
  defaultColFiltersMember
}