'use client'

import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import SelectControlForm from "@/components/common/form/select-control-form"
import TextareaControlForm from "@/components/common/form/textarea-control-form"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

//TODO: styling this form
export default function UserProfileForm({ username, fullName, email, gender, address }) {

  const genderOpt = [
    { val: 'm', label: 'Laki-Laki' }, 
    { val: 'f', label: 'Perempuan' }
  ]

  const [formState, setFormState] = useState({
    viewOnly: true,
    update: false
  })

  const inputRequired = formState.viewOnly ? false : true

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    defaultValues: {
      username: username,
      fullName: fullName,
      email: email,
      gender: gender,
      address: address
    }
  })


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

  const onSubmit = async (data, e) => {
    //TODO: handle submit update profile data
    console.log(data)
  }


  return (
    <MainContentForm
      useFormProp={form}
      className="pt-4"
      onSubmitForm={onSubmit}
      noValidate
    >
      <section className="flex flex-col gap-5 mb-8">
        <InputControlForm
          useFormProp={form}
          name="fullName"
          label="Nama Lengkap"
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <InputControlForm
          useFormProp={form}
          name="username"
          label="Username"
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <InputControlForm
          useFormProp={form}
          name="email"
          label="Email"
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <SelectControlForm
          useFormProp={form}
          name="gender"
          label="Jenis Kelamin"
          isRequired={inputRequired}
          placholder="Pilih"
          items={genderOpt}
          disabled={formState.viewOnly}
        />

        <TextareaControlForm
          useFormProp={form}
          name="address"
          label="Alamat Lengkap"
          isRequired={inputRequired}
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
        {formState.update && (
          <>
            <Button 
              type="submit" 
            >
              Simpan Perubahan
            </Button>
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