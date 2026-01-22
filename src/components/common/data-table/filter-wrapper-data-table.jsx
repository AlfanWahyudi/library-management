"use client"

import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import SearchDataTable from "./search-data-table";

export default function FilterWrapperDataTable({ searchingFieldItems, table, onResetFilter = () => {}, isFilterChange = false, children }) {
  return (
    <>
      <Separator className="my-4" />
        <section className="mb-4 flex flex-wrap gap-3 justify-between">
          <SearchDataTable 
            className="md:min-w-1/3"
            searchingFieldItems={searchingFieldItems} 
            table={table} 
          />
          <article className="text-sm flex flex-wrap gap-3">
            {children}
            {children && <Button onClick={onResetFilter} variant="link" className="text-destructive" disabled={!isFilterChange}>Reset Filter</Button>}
          </article>
        </section>
      <Separator className="my-4" />
    </>
  )
}