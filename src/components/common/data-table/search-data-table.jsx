"use client"

import { useInput } from "@/hooks/use-input";
import { Input } from "../../ui/input";
import { useEffect } from "react";
import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";

export default function SearchDataTable({ searchingFieldItems, table, delay = 400, className = "" }) {
  const classes = `flex relative ${className}`

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

  return (
    <div className={classes}>
      <Search className="text-neutral-400 w-5 md:w-4 absolute top-1.5 left-2" />
      <Input 
        className="ps-9 md:ps-8" 
        placeholder={`Cari ${searchingFields}...`}
        value={value}
        onChange={(e) => {
          handleInputChange(e)
        }}
      />
    </div>
)
}
