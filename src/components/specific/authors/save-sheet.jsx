'use client'

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import AuthorForm from "./form";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";

export default function SaveSheetAuthor({
}) {
  const [ openForm, setOpenForm ] = useState(false)

  function handleSuccess() {
    setOpenForm(false)
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