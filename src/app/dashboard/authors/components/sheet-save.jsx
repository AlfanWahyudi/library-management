'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import AuthorForm from "./form";


//TODO: Jangan tutup mmodal nya ketika click diluar modal component. close modal nya hanya dengan click tombol "tutup dan X"
//TODO: Pisahkan komponen untuk Alert nya ya
export default function AuthorSheetSave({
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
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Pengarang</AlertDialogTitle>
            <AlertDialogDescription>
              Data pengarang berhasil ditambahkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => handleAlertAction()}>Oke</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button>Tambah pengarang</Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-full sm:w-lg">
          <AuthorForm 
            openForm={openForm}
            cbSuccess={handleSuccess}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}