'use client'

import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import SelectControlForm from "@/components/common/form/select-control-form"
import TextareaControlForm from "@/components/common/form/textarea-control-form"
import { Button } from "@/components/ui/button"
import useFetch from "@/hooks/use-fetch"
import { updateProfile } from "@/lib/http/user-http"
import { userClientSchema } from "@/lib/schemas/users/user-client-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: styling this form
//TODO: Jika terdapat prefix space pada semua input fields, maka hapus spasi nya
//TODO: validate duplicate email client side jangan dengan ZOD
// bagaimana kalau ternya fetch nya gagal?
// - disable form
// - refresh page 
// - disable input nya
// - kasih pesan error fetch, dan berikan info untuk merefresh page. 
export default function UserProfileForm({ username, fullName, email, gender, address }) {
  const router = useRouter()

  const [formState, setFormState] = useState({
    viewOnly: true,
    update: false
  })

  const inputRequired = formState.viewOnly ? false : true

  const form = useForm({
    mode: 'all',
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
    resolver: zodResolver(userClientSchema)
  })

  const {
    error,
    isPending,
    runFetch,
    fetchedData: user,
    reset: fetchReset,
  } = useFetch({ initialValue: undefined })

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

  const onSubmit = async (data, e) => {
    if (formState.update) {
      await runFetch({
        fetchFn: async() => await updateProfile({...data, username})
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
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <InputControlForm
          control={form.control}
          name="email"
          label="Email"
          isRequired={inputRequired}
          disabled={formState.viewOnly}
        />

        <SelectControlForm
          control={form.control}
          name="gender"
          label="Jenis Kelamin"
          isRequired={inputRequired}
          placholder="Pilih"
          items={genderOpt}
          selectedValue={form.getValues('gender')}
          disabled={formState.viewOnly}
        />

        <TextareaControlForm
          control={form.control}
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
              disabled={isPending || !form.formState.isDirty}
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