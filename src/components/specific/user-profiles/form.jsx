'use client'

import AlertMain from "@/components/common/alert-main"
import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import SelectControlForm from "@/components/common/form/select-control-form"
import TextareaControlForm from "@/components/common/form/textarea-control-form"
import { Button } from "@/components/ui/button"
import useFetch from "@/hooks/use-fetch"
import { checkEmailExist, updateProfile } from "@/lib/http/user-http"
import { getErrMsgZod } from "@/lib/utils/zod"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import validateUserProfile from "./validate"

const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: e2e testing
//TODO: cleaning the code
//TODO: styling this form
export default function UserProfileForm({ username, fullName, email, gender, address }) {
  const router = useRouter()

  const [formState, setFormState] = useState({
    viewOnly: true,
    update: false
  })

  const inputRequired = formState.viewOnly ? false : true

  const form = useForm({
    mode: 'onChange',
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

  const {
    error,
    isPending,
    runFetch,
    fetchedData: user,
    reset: fetchReset,
  } = useFetch({ initialValue: undefined })

  const {
    error: checkEmailError,
    runFetch: runFetchCheckEmail,
    fetchedData: isEmailExist,
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = isPending || !form.formState.isDirty || error || checkEmailError

  useEffect(() => {
    if (user) {
      toast.success('Berhasil memperbarui data profile.')

      setTimeout(() => {
        fetchReset()

        router.refresh()
      }, 200)
    }

    if (error) {
      toast.error(error)
    }

  }, [user, error])

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

  const mapData = ({ username, fullName, email, gender, address }) => {
    return {
      username,
      email,
      gender,
      fullName: fullName.trim(),
      address: address.trim(),
    }
  }

  const onSubmit = async (data, e) => {
    const dataMapped = mapData(data)
    if (formState.update) {
      await runFetch({
        fetchFn: async() => await updateProfile({...dataMapped, username})
      })
    }
  }

  return (
    <MainContentForm
      useFormProp={form}
      className="pt-4"
      onSubmitForm={onSubmit}
      noValidate
    >
      <section className="flex flex-col gap-5 mb-8">
        {checkEmailError && (
          <AlertMain title='Error melakukan pengecekan duplikasi email' variant="error">
            <p>{checkEmailError}</p>
          </AlertMain>
        )}
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
            <Button 
              type="submit" 
              disabled={disableSubmitBtn}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              {isPending
                ? 'Mohon tunggu'
                : 'Simpan Perubahan'
              }
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