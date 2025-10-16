"use client"

import { useInput } from "@/hooks/use-input";
import { Input } from "../../ui/input";
import { useEffect } from "react";
import useDebounce from "@/hooks/use-debounce";

export default function SearchDataTable({ searchingFieldItems, table, delay = 400 }) {
  const {
    value,
    handleInputChange
  } = useInput(table.getState().globalFilter)

  const debounceValue = useDebounce(value, delay)

  const searchingFields = searchingFieldItems.map((item) => item.name.toLowerCase()).join(', ')

  useEffect(() => {
    if (debounceValue !== null || debounceValue !== undefined) {
      table.setGlobalFilter(debounceValue)
    }
    
  }, [table, debounceValue])


  return <Input 
    className="w-100" 
    placeholder={`Cari ${searchingFields}...`}
    value={value}
    onChange={(e) => {
      handleInputChange(e)
    }}
  />
}
