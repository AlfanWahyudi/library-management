'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AuthorBookTable({ bookItems }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Judul</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead className='text-right'>Edisi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookItems.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell className='text-right'>{!book.edition ? '-' : book.edition }</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}