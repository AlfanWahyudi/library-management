'use client'

import { BookIcon, BookUpIcon, UsersIcon } from "lucide-react"

const mapTotalInfoData = ({ canViewTotalBook, canViewTotalBookLoan, canViewTotalMember, totalBookLoan, totalBook, totalMember }) => {
  return [
    {
      name: "Total Peminjaman",
      total: totalBookLoan,
      visible: canViewTotalBookLoan,
      icon: <BookUpIcon />
    },
    {
      name: "Total Buku",
      total: totalBook,
      visible: canViewTotalBook,
      icon: <BookIcon />
    },
    {
      name: "Total Anggota",
      total: totalMember,
      visible: canViewTotalMember,
      icon: <UsersIcon />
    },
  ]
}

export {
  mapTotalInfoData
}