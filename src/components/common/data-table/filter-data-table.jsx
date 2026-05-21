"use client"

import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem, SelectLabel } from "../../ui/select";

export default function FilterDataTable({ placeHolder }) {
  return (
    <Select
      defaultValue={'all'}
    >
      <SelectTrigger 
        className="min-w-[150px] text-sm"
      >
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Jenis Kelamin</SelectLabel>
          <SelectItem value='all'>Semua</SelectItem>
          <SelectItem value='m'>Laki-Laki</SelectItem>
          <SelectItem value='f'>Perempuan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}