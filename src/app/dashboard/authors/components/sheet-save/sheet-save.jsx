'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import InputControl from "@/components/input-control";
import TextareaControl from "@/components/textarea-control";
import { useActionState } from "react";
import { saveAuthor } from "../../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authorSchema } from "@/lib/schemas/author-schema";



//TODO: display an error message (server)
//TODO: display success message
//TODO: hide sheet if success add data
export default function AuthorSheetSave({
}) {
  const [state, action, isPending] = useActionState(saveAuthor, undefined)
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
    resolver: zodResolver(authorSchema)
  })

  const onSubmit = (data, e) => {

    //TODO: save new author data to api
    console.log(data)
    console.log(e)
  }

  function handleOpenSheet() {
    reset()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleOpenSheet}>Tambah pengarang</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-full sm:w-lg">
        <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)} action={action} noValidate>
          <SheetHeader>
            <SheetTitle>Tambah pengarang</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
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
  )
}