'use client'

import AlertMain from "@/components/common/alert-main"
import InputControlForm from "@/components/common/form/input-control-form"
import MainContentForm from "@/components/common/form/main-content-form"
import { Button } from "@/components/ui/button"
import { SheetClose, SheetFooter, SheetHeader } from "@/components/ui/sheet"
import useFetch from "@/hooks/use-fetch"
import { changeUsername, checkUsernameExist } from "@/lib/http/user-http"
import { getErrMsgZod } from "@/lib/utils/zod-utils"
import { Loader2Icon } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

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
  

  const {
    error: checkUsernameErr,
    fetchedData: isUsernameExist,
    runFetch: runFetchCheckUsername,
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = isPending || !form.formState.isDirty || error || checkUsernameErr


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

    // trigger newUsername field when duplicate
    if (isUsernameExist) {
      form.trigger('newUsername')
    } else {
      form.clearErrors('newUsername')
    }

  }, [user, error, isUsernameExist  ])

  const onSubmit = async (data, e) => {
    await runFetch({
      fetchFn: async () => await changeUsername(data)
    })
  }

  const validateNewUsername = async (newUsername) => {
    const schema = z.string().trim().min(1, 'Username Baru tidak boleh kosong')

    const result = schema.safeParse(newUsername)
    if (!result.success) return getErrMsgZod(result)

    if (prevUsername === newUsername) return 'Username Baru tidak boleh sama dengan yang sekarang'

    await runFetchCheckUsername({
      fetchFn: async () => await checkUsernameExist({ username: newUsername })
    })

    if (isUsernameExist) {
      return 'Username sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  }

  return (
    <MainContentForm
      useFormProp={form} 
      onSubmitForm={onSubmit} 
      className="flex-1 flex flex-col gap-4"
      noValidate
    >
      <SheetHeader>{formTitle}</SheetHeader>
      <section className="flex-1 gap-5 px-4 ">
        {checkUsernameErr && (
          <AlertMain title='Error melakukan pengecekan duplikasi username' variant="error">
            <p>{checkUsernameErr}</p>
          </AlertMain>
        )}
        <InputControlForm 
          control={form.control}
          label="Username Baru"
          name="newUsername"
          isRequired={true}
          rules={{
            validate: validateNewUsername,
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