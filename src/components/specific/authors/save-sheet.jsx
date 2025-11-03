'use client'

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react";
import AuthorForm from "./form";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import { DataTableContext } from "@/store/data-table-context";
import { useRouter } from "next/navigation";

export default function SaveSheetAuthor({
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
          <Button size='sm'>Tambah pengarang</Button>
        </SheetTrigger>
        <SheetContentMain
          preventPointerDownOutside={true}
        >
          <AuthorForm 
            openForm={openForm}
            cbSuccess={handleSuccess}
          />
        </SheetContentMain>
      </Sheet>
    </>
  )
}