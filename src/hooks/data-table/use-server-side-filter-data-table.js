'use client'

import { useState } from "react"

export default function useServerSideFilterDataTable({
  table,
  colFiltersVal
}) {
  const [colFilters, setColFilters] = useState(colFiltersVal)

  const [filterReset, setFilterReset] = useState(false)

  const resetFilter = () => {
    setFilterReset(true)
  }

  const keepFilter = () => {
    setFilterReset(false)
  }

  const updateColFilters = ({colId, val}) => {
    if (!colFilters.hasOwnProperty(colId)) throw new Error('colId is not found')

    setColFilters((prev) => ({...prev, [colId]: val}))
  }

  const filtering = () => {
    Object.entries(colFilters).forEach(([colId, val]) => {
      const col = table.getColumn(colId)
      col.setFilterValue(val)
    })

    keepFilter()
  }

  return {
    colFilters,
    filterReset,
    resetFilter,
    keepFilter,
    updateColFilters,
    filtering
  }
}