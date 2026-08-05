'use client'

import { BookIcon, BookUpIcon, UsersIcon } from "lucide-react"

const mapTotalInfoData = ({ totalBookLoan, totalBook, totalMember }) => {
  return [
    {
      name: "Total Peminjaman",
      total: totalBookLoan,
      icon: <BookUpIcon />
    },
    {
      name: "Total Buku",
      total: totalBook,
      icon: <BookIcon />
    },
    {
      name: "Total Anggota",
      total: totalMember,
      icon: <UsersIcon />
    },
  ]
}

export {
  mapTotalInfoData
}