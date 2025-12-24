'use client';

import CalendarControlForm from "@/components/common/form/calendar-control-form";
import InputControlForm from "@/components/common/form/input-control-form";
import MainContentForm from "@/components/common/form/main-content-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import validateMember from "./validate";
import { ROUTE } from "@/lib/constants/route";
import MemberAlertDialogForm from "./alert-dialog/alert-dialog-form";


const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: styling form, must be responsive
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

  const formTitle = formType === 'create' 
    ? 'Tambah Anggota'
    : formType === 'update'
      ? 'Update Anggota'
      : formType === 'view'
        ? 'Detail Anggota'
        : 'Form Anggota'

  const inputRequired = viewOnly ? false : true
  const disabledInput = formType === 'view'

  const router = useRouter()

  const form = useForm({
    mode: 'onBlur',
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

  const onSuccSubmit = () => {
    router.push(ROUTE.MEMBERS.url)
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
          >
            Reset
          </Button>
        )}
        {formType !== 'view' && (
          <MemberAlertDialogForm 
            form={form}
            formType={formType}
            formTitle={formTitle}
            member={member}
            onSuccSubmit={onSuccSubmit}
          />
        )}
      </section>
    </MainContentForm>
  )
}