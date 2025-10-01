'use client'

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthorForm from "./form";
import SheetContentMain from "@/components/common/sheet/sheet-content-main";
import AlertDialogInfo from "@/components/common/alert-dialog/alert-dialog-info";


//TODO: Jangan tutup mmodal nya ketika click diluar modal component. close modal nya hanya dengan click tombol "tutup dan X"
//TODO: Pisahkan komponen untuk Alert nya ya
export default function SaveSheetAuthor({
}) {
  const router = useRouter()

  const [ openAlert, setOpenAlert ] = useState(false)
  const [ openForm, setOpenForm ] = useState(false)

  function handleAlertAction() {
    setOpenForm(false)
  }

  function handleSuccess() {
    setOpenAlert(true)
    router.refresh()
  }

  return (
    <>
      <AlertDialogInfo
        title='Tambah Pengarang'
        open={openAlert}
        onOpenChange={setOpenAlert}
        cbAfterActionClicked={() => handleAlertAction()}
      >
        Data pengarang berhasil ditambahkan.
      </AlertDialogInfo>

      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button size='sm'>Tambah pengarang</Button>
        </SheetTrigger>
        <SheetContentMain>
          <AuthorForm 
            openForm={openForm}
            cbSuccess={handleSuccess}
            title='Tambah pengarang'
          />
        </SheetContentMain>
      </Sheet>
    </>
  )
}