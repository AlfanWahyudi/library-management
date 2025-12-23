'use client';

import CalendarControlForm from "@/components/common/form/calendar-control-form";
import InputControlForm from "@/components/common/form/input-control-form";
import MainContentForm from "@/components/common/form/main-content-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { saveMember } from "@/lib/http/member-http";
import { formatDate } from "@/lib/utils/date";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import validateMember from "./validate";
import { ROUTE } from "@/lib/constants/route";
import MemberAlertDialogForm from "./alert-dialog-form";


const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: styling form, must be responsive
//TODO: perbaiki selalu request untuk check email dan phone nya, padahal kedua field itu sedang tidak diinputkan
export default function MemberForm({
  member = null,
  viewOnly = false,
}) {
  const formType = 
    viewOnly && member 
      ? 'view'
      : !viewOnly && member
        ? 'update'
        : !viewOnly && !member
          ? 'create'
          : null

  const disabledInput = formType === 'view'

  const inputRequired = viewOnly ? false : true

  const router = useRouter()

  const form = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      fullName: member?.fullName || '',
      email: member?.email || '',
      phone: member?.phone || '',
      address: member?.address || '',
      birthDate: member ? new Date(member.birthDate) : undefined,
      gender: member?.gender || '',
    },
  })

  const {
    error: errorSaved,
    runFetch: runSaveMember,
    isPending: pendingSaved,
    fetchedData: saveData,
    reset: fetchSaveReset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved ||!form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    if (saveData) {
      if (formType === 'create') {
        toast.success('Berhasil menambahkan data anggota baru')
      }

      if (formType === 'update') {
        toast.success('Berhasil update data anggota')
      }

      fetchSaveReset()
      router.push(ROUTE.MEMBERS.url)
    }

    if (errorSaved) {
      toast.error(errorSaved)
    }
  }, [saveData, errorSaved])


  const mapData = ({ fullName, email, phone, address, birthDate, gender }) => {
    return {
      email,
      phone,
      gender,
      fullName: fullName.trim(),
      address: address.trim(),
      birthDate: formatDate({ date: birthDate }),
    }
  }

  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }

  const onSubmit = async (evt) => {
    if (form.formState.isValid) {
      const id = member ? member.id : null

      const data = form.getValues()
      const mappedData = mapData(data)

      await runSaveMember({
        fetchFn: async () => await saveMember({ data: mappedData, id })
      })
    }
  }

  const onReset = () => {
    form.reset()
  }
  
  return (
    <MainContentForm
      useFormProp={form}
      className='grid gap-5'
      noValidate
    >
      <section>
      </section>
      <InputControlForm 
        control={form.control}
        name="fullName"
        label="Nama Lengkap"
        isRequired={inputRequired}
        rules={{
          validate: validateMember.fullName
        }}
        disabled={disabledInput}
      />
      {/* TODO: perbaiki error isDirty form nya tidak berfungsi, padahal tanggal sudah dipilih */}
      <CalendarControlForm 
        control={form.control}
        name='birthDate'
        label='Tanggal Lahir'
        isRequired={inputRequired}
        rules={{
          validate: validateMember.birthDate
        }}
        disabled={disabledInput}
      />
      <SelectControlForm 
        control={form.control}
        name="gender"
        label="Jenis Kelamin"
        items={genderOpt}
        isRequired={inputRequired}
        rules={{
          validate: validateMember.gender
        }}
        disabled={disabledInput}
      />
      <InputControlForm 
        control={form.control}
        name="email"
        label="Email"
        isRequired={inputRequired}
        rules={{
          validate: (email) => (validateMember.email(email, member?.id)) 
        }}
        disabled={disabledInput}
      />
      <InputControlForm 
        control={form.control}
        name="phone"
        label="No Telepon"
        isRequired={inputRequired}
        rules={{
          validate: (phone) => (validateMember.phone(phone, member?.id))
        }}
        disabled={disabledInput}
      />
      <TextareaControlForm 
        control={form.control}
        name="address"
        label="Alamat Lengkap"
        isRequired={inputRequired}
        rules={{
          validate: validateMember.address
        }}
        disabled={disabledInput}
      />
      <section className="mt-5 flex flex-col gap-4">
        {formType === 'update' && (
          <Button
            type="button" 
            variant='outline' 
            onClick={onReset}
            disabled={pendingSaved}
          >
            Reset
          </Button>
        )}
        {formType !== 'view' && (
          <MemberAlertDialogForm 
            formType={formType}
            onSubmit={onSubmit}
            triggerDisabled={disableSubmitBtn}
            onTrigger={onTrigger}
          />
        )}
      </section>
    </MainContentForm>
  )
}