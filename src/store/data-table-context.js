'use client'

import { createContext, useState } from "react"


export const DataTableContext = createContext({
  refreshTable: () => {},
  stopRefreshTable: () => {},
  isTableRefreshed: false,
})

export default function DataTableContextProvider({children}) {
  const [ refresh, setIsRefresh ] = useState(false)

  const refreshTable = () => {
    setIsRefresh(true)
  }

  const stopRefreshTable = () => {
    setIsRefresh(false)
  }

  const ctxValue = {
    refreshTable,
    stopRefreshTable,
    isTableRefreshed: refresh,
  }
  return (
    <DataTableContext.Provider value={ctxValue} >
      {children}
    </DataTableContext.Provider>
  )
}