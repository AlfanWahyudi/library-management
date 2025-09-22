"use client"

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import SearchDataTable from "./search-data-table";

export default function FilterWrapperDataTable({ searchingFieldItems, table, children }) {
  return (
    <>
      <Separator className="my-4" />
        <section className="mb-4 flex flex-wrap gap-3 justify-between">
          <SearchDataTable searchingFieldItems={searchingFieldItems} table={table} />
          <article className="text-sm flex flex-wrap gap-3">
            {children}
            {children && <Button variant="link" className="text-destructive" disabled>Hapus Filter</Button>}
          </article>
        </section>
      <Separator className="my-4" />
    </>
  )
}