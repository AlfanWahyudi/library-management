'use client'

import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import { Button } from "@/components/ui/button"
import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import validateChangeUsername from "./validate"
import UserProfileAlertDialogChangeUsername from "../alert-dialog/alert-dialog-change-username"

export default function ChangeUsernameForm({
  cbSuccess = () => {},
  prevUsername,
}) {
  const formTitle = 'Ganti Username'

  const form = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      newUsername: ''
    }
  })

  return (
    <MainContentForm
      useFormProp={form} 
      className="flex-1 flex flex-col gap-4"
      noValidate
    >
      <SheetHeader>
        <SheetTitle>{formTitle}</SheetTitle>
      </SheetHeader>
      <section className="flex-1 gap-5 px-4 ">
        <InputControlForm 
          control={form.control}
          label="Username Baru"
          name="newUsername"
          isRequired={true}
          rules={{
            validate: (val) => (validateChangeUsername.newUsername(val, prevUsername)),
          }}
        />

      </section>
      <SheetFooter>
        <UserProfileAlertDialogChangeUsername 
          form={form}
          formTitle={formTitle}
          onSuccSubmit={cbSuccess}
        />
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}