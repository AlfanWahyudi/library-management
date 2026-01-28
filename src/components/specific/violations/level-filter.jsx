'use client'

import { VIOLATION_LEVEL } from "@/lib/constants/violation-level"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

import React, { useEffect, useState } from "react"

const violationLevels = Object.entries(VIOLATION_LEVEL)
  .map(([key, value]) => ({ val: key, label: value }))

export default function ViolationLevelFilter({ defaultVal, filterReset, onChange }) {
  const anchor = useComboboxAnchor()

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
    <Combobox 
      multiple
      items={violationLevels}
      onValueChange={handleValueChange}
    >
      <ComboboxChips ref={anchor} className="w-full sm:w-60">
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((item) => (
                <ComboboxChip key={item.val}>{item.label}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={values.length === 0 ? 'Pilih level' : ''} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Level tidak ditemukan.</ComboboxEmpty>
        <ComboboxList>
          {(level) => (
            <ComboboxItem 
              key={level.val} 
              value={level}
            >
              {level.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}