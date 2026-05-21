'use client'

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import { DataTableContext } from "@/store/data-table-context";
import BookLoanForm from "./form";

export default function SaveSheetBookLoan({
}) {
  const { refreshTable } = useContext(DataTableContext)
 
  const [ openForm, setOpenForm ] = useState(false)

  function handleSuccess() {
    setOpenForm(false)
    refreshTable()
  }

  return (
    <>
      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button size='sm'>Tambah peminjaman buku</Button>
        </SheetTrigger>
        <SheetContentMain
          preventPointerDownOutside={true}
        >
          <BookLoanForm 
            openForm={openForm}
            cbSuccess={handleSuccess}
          />
        </SheetContentMain>
      </Sheet>
    </>
  )
}