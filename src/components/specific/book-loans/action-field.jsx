'use client';


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Eye, SquarePen, Trash } from "lucide-react";
import Link from "next/link";


// TODO: ganti button open dengan icon
// TODO: open form Selesai Minjam
// TODO: open form Selesai Minjam (Tapi Buku Hilang)
export default function ActionFieldBookLoan({ bookLoan }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Pinjaman Selesai</DropdownMenuItem>
        <DropdownMenuItem>Pinjaman Selesai (Buku Hilang)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}