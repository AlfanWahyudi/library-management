'use client'

import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem, SelectLabel } from "@/components/ui/select"
import { useEffect, useState } from "react"

export default function MemberGenderFilter({ defaultVal, filterReset, onChange }) {
  const [gender, setGender] = useState(defaultVal)

  const resetToDefault = () => {
    setGender(defaultVal)
  }

  useEffect(() => {
    if (filterReset) {
      resetToDefault()
    }

    onChange(gender)
  }, [gender, filterReset])
  
  return (
    <Select value={gender} onValueChange={setGender}>
      <SelectTrigger className="min-w-[130px]">
        <SelectValue placeholder='Jenis kelamin'></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Jenis kelamin</SelectLabel>
          <SelectItem value='all'>Semua</SelectItem>
          <SelectItem value='m'>Laki-Laki</SelectItem>
          <SelectItem value='f'>Perempuan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}