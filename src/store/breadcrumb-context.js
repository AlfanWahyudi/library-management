'use client'

import { createContext, useState } from "react"

export const BreadcrumbContext = createContext({
  routes: [],
  setRoutesToBreadcrumb: (routes = []) => {},
  removeRoutes: () => {}
})

export default function BreadCrumbContextProvider({ children }) {
  const [routes, setRoutes] = useState([])

  function handleSetRoutes(routes) {
    setRoutes([...routes])
  }

  function handleRemoveRoutes() {
    setRoutes([])
  }

  const ctxValue = {
    routes,
    setRoutesToBreadcrumb: handleSetRoutes,
    removeRoutes: handleRemoveRoutes,
  }

  return (
    <BreadcrumbContext.Provider value={ctxValue}>
      {children}
    </BreadcrumbContext.Provider>
  )

}