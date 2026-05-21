'use client'

import { VIOLATION_LEVEL } from "@/lib/constants/violation-level"
import React, { useEffect, useState } from "react"
import ComboboxMultiple from "@/components/common/combobox/combobox-multiple"

const violationLevels = Object.entries(VIOLATION_LEVEL)
  .map(([key, value]) => ({ val: key, label: value }))

export default function ViolationLevelFilter({ defaultVal, filterReset, onChange }) {
  const [selected, setSelected] = useState({
    value: [],
    filterVal: defaultVal
  })

  const handleValueChange = (val) => {
    const newFilterVal = val.length === 0
      ? 'all'
      : val.map((item) => item.val).join(',')

    setSelected({
      value: val,
      filterVal: newFilterVal
    })
  }

  const resetSelectedToDefault = () => {
    setSelected({
      value: [],
      filterVal: defaultVal
    })
  }

  useEffect(() => {
    if (filterReset) {
      resetSelectedToDefault()
    }

    onChange(selected.filterVal)
  }, [selected.filterVal, filterReset])


  return (
    <ComboboxMultiple 
      items={violationLevels}
      value={selected.value}
      onValueChange={handleValueChange}
      emptyLabel="Level tidak ditemukan"
      placeholder="Pilih level"
      className='max-w-2xs'
    />
  )
}