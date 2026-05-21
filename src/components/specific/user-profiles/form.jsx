'use client'

import AlertMain from "@/components/common/alert-main"
import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import SelectControlForm from "@/components/common/form/select-control-form"
import TextareaControlForm from "@/components/common/form/textarea-control-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import validateUserProfile from "./validate"
import UserProfileAlertDialogForm from "./alert-dialog/alert-dialog-form"

const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: e2e testing
//TODO: styling this form
export default function UserProfileForm({ username, fullName, email, gender, address }) {
  const router = useRouter()

  const [formState, setFormState] = useState({
    viewOnly: true,
    update: false
  })

  const inputRequired = formState.viewOnly ? false : true

  const form = useForm({
    mode: 'onBlur',
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    values: {
      username: username,
      fullName: fullName,
      email: email,
      gender: gender,
      address: address
    },
  })

  const onSuccess = () => {
    router.refresh()
  }

  const changeFormView = (view) => {
    setFormState({
      viewOnly: view === 'view',
      update: view === 'update'
    })

    const currFormStateUpdate = formState.update
    const wantChangeToView = currFormStateUpdate && view === 'view'
    if (wantChangeToView) {
      form.reset()
    }
  }

  return (
    <MainContentForm
      useFormProp={form}
      className="pt-4"
      noValidate
    >
      <section className="flex flex-col gap-5 mb-8">
        <InputControlForm
          control={form.control}
          name="username"
          label="Username"
          disabled={true}
        />

        <InputControlForm
          control={form.control}
          name="fullName"
          label="Nama Lengkap"
          rules={{
            validate: validateUserProfile.fullName,
          }}
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <InputControlForm
          control={form.control}
          name="email"
          label="Email"
          rules={{
            validate: validateUserProfile.email,
          }}
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <SelectControlForm
          control={form.control}
          name="gender"
          label="Jenis Kelamin"
          isRequired={inputRequired}
          placeholder="Pilih"
          items={genderOpt}
          selectedValue={form.getValues('gender')}
          rules={{
            validate: validateUserProfile.gender,
          }}
          disabled={formState.viewOnly}
        />

        <TextareaControlForm
          control={form.control}
          name="address"
          label="Alamat Lengkap"
          isRequired={inputRequired}
          rules={{
            validate: validateUserProfile.address,
          }}
          disabled={formState.viewOnly}
        />
      </section>
      <section className="flex gap-3">
        {
          formState.viewOnly && (
            <Button 
              type="button" 
              onClick={() => changeFormView('update')} 
              variant='outline'
            >
              Update Profile
            </Button>
          )
        }
        {/* TODO: Add confirmation to before submitting   */}
        {formState.update && (
          <>
            <UserProfileAlertDialogForm 
              form={form}
              onSuccSubmit={onSuccess}
            />
            <Button 
              type="button" 
              variant='outline' 
              onClick={() => changeFormView('view')}
            >
              Batal
            </Button>
          </>
        )}
      </section>
    </MainContentForm>
  )
}