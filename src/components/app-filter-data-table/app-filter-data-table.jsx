"use client"

import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";

export default function AppFilterDataTable({ placeHolder }) {
  return (
    <Select>
      <SelectTrigger className="rounded-full text-sm">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}