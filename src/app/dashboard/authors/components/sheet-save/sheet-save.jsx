'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import InputControl from "@/components/input-control";
import TextareaControl from "@/components/textarea-control";
import { useInput } from "@/hooks/use-input";
import { useActionState, useState } from "react";
import { saveAuthor } from "../../actions";

//TODO: add client validation
//TODO: display an error message (from client and server)
//TODO: display success message
//TODO: hide sheet if success add data
export default function AuthorSheetSave({
}) {
  const [state, action, isPending] = useActionState(saveAuthor, undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    value: fullNameVal,
    didEdit: didFullNameEdit,
    resetValue: resetFullName,
    handleInputBlur: handleFullNameBlur,
    handleInputChange: handleFullNameChange
  } = useInput('')

  const {
    value: countryCode,
    didEdit: didCountryEdit,
    resetValue: resetCountry,
    handleInputBlur: handleCountryBlur,
    handleInputChange: handleCountryChange
  } = useInput('')

  const {
    value: activeSinceVal,
    didEdit: didActiveSinceEdit,
    resetValue: resetActiveSince,
    handleInputBlur: handleActiveSinceBlur,
    handleInputChange: handleActiveSinceChange
  } = useInput('')

  const {
    value: aboutVal,
    didEdit: didAboutEdit,
    resetValue: resetAbout,
    handleInputBlur: handleAboutBlur,
    handleInputChange: handleAboutChange
  } = useInput('')


  function handleOpenSheet() {
    resetFullName()
    resetActiveSince()
    resetAbout()
    resetCountry()
  }


  function handleSubmit(evt) {
    console.log(fullNameVal, countryCode, activeSinceVal, aboutVal)
    setIsSubmitted(true)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleOpenSheet}>Tambah pengarang</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-full sm:w-lg">
        <form className="flex-1 flex flex-col" onSubmit={handleSubmit} action={action} noValidate>
          <SheetHeader>
            <SheetTitle>Tambah pengarang</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <InputControl
              name="fullName"
              id="fullName"
              label="Nama Lengkap"
              type="text"
              isRequired={true}
              value={fullNameVal}
              onBlur={handleFullNameBlur}
              onChange={handleFullNameChange}
            />
            <InputControl
              name="countryCode"
              id="countryCode"
              label="Kebangsaan"
              type="text"
              value={countryCode}
              onBlur={handleCountryBlur}
              onChange={handleCountryChange}
            />
            <InputControl
              name="activeSince"
              id="activeSince"
              label="Aktif Sejak"
              type="number"
              value={activeSinceVal}
              onBlur={handleActiveSinceBlur}
              onChange={handleActiveSinceChange}
            />
            <TextareaControl
              name="about"
              id="about"
              label="Tentang"
              rows={10}
              value={aboutVal}
              onBlur={handleAboutBlur}
              onChange={handleAboutChange}
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