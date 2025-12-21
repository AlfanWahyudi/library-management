'use client'

import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import { Button } from "@/components/ui/button"
import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import useFetch from "@/hooks/use-fetch"
import { changeUsername } from "@/lib/http/user-http"
import { Loader2Icon } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import validateChangeUsername from "./validate"

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

  const {
    error,
    isPending,
    runFetch,
    fetchedData: user,
    reset: fetchReset,
  } = useFetch({ initialValue: undefined })
  
  const disableSubmitBtn = isPending || !form.formState.isDirty || error


  useEffect(() => {
    if (user) {
      toast.success('Berhasil menggati username')

      setTimeout(() => {
        fetchReset()

        cbSuccess()
      }, 200)
    }

    if (error) {
      toast.error(error)
    }
  }, [user, error ])

  const onSubmit = async (data, e) => {
    await runFetch({
      fetchFn: async () => await changeUsername(data)
    })
  }

  return (
    <MainContentForm
      useFormProp={form} 
      onSubmitForm={onSubmit} 
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
        {/* TODO: Add confirmation to before submitting   */}
        <Button type="submit" size='sm' disabled={disableSubmitBtn}>
          {isPending && <Loader2Icon className="animate-spin" />}
          {isPending 
            ? 'Mohon tunggu'
            : 'Simpan'
          }
        </Button>
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}