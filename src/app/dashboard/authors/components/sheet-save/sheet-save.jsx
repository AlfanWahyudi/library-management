'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import InputControl from "@/components/input-control";
import TextareaControl from "@/components/textarea-control";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authorClientSchema } from "@/lib/schemas/author-schema";
import AlertMain from "@/components/alert-main";
import useFetch from "@/hooks/use-fetch";
import { saveAuthor } from "@/lib/http/author-http";
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

//TODO: input kebangsaan ganti jadi select, dan list options nya ngambil ke DB
export default function AuthorSheetSave({
}) {
  const router = useRouter()

  const [ openAlert, setOpenAlert ] = useState(false)
  const [ openForm, setOpenForm ] = useState(false)

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },

  } = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    defaultValues: {
      fullName: '',
      countryCode: '',
      activeSince: null,
      about: null,
    },
    resolver: zodResolver(authorClientSchema)
  })

  const {
    error,
    isPending,
    runFetch,
    reset: resetFetch,
    fetchedData,
  } = useFetch({ initialValue: undefined })

  const onSubmit = async (data, e) => {
    await runFetch({ fetchFn: async() => await saveAuthor({data}) })
    
    if (!error) {
      setOpenAlert(true)
      router.refresh()
    }
  }
  
  function handleOpenSheet() {
    reset()
    resetFetch()
  }

  function handleAlertAction() {
    setOpenForm(false)
  }

  return (
    <>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Pengarang</AlertDialogTitle>
            <AlertDialogDescription>
              Pengarang {fetchedData?.fullName} berhasil ditambahkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => handleAlertAction()}>Oke</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet open={openForm} onOpenChange={setOpenForm}>
        <SheetTrigger asChild>
          <Button onClick={handleOpenSheet}>Tambah pengarang</Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-full sm:w-lg">
          <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
            <SheetHeader>
              <SheetTitle>Tambah pengarang</SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              {error !== '' && (
                <AlertMain title='Error form tambah pengarang' variant="error">
                  <p>{error}</p>
                </AlertMain>  
              )}
              <InputControl
                {...register('fullName')}
                id="fullName"
                label="Nama Lengkap"
                type="text"
                isRequired={true}
                hasError={errors['fullName'] !== undefined}
                errorMsg={[errors.fullName?.message]}
              />
              <InputControl
                {...register('countryCode')}
                id="countryCode"
                label="Kebangsaan"
                type="text"
                isRequired={true}
                hasError={errors['countryCode'] !== undefined}
                errorMsg={[errors.countryCode?.message]}
              />
              <InputControl
                {...register('activeSince')}
                id="activeSince"
                label="Aktif Sejak"
                type="number"
                hasError={errors['activeSince'] !== undefined}
                errorMsg={[errors.activeSince?.message]}
              />
              <TextareaControl
                {...register('about')}
                id="about"
                label="Tentang"
                rows={10}
                hasError={errors['about'] !== undefined}
                errorMsg={[errors.about?.message]}
              />
            </div>
            <SheetFooter>
              <Button type="submit">
                {isPending ? 'Submitted...' : 'Simpan'}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">Tutup</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}