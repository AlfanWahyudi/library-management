'use client';

import CalendarControlForm from "@/components/common/form/calendar-control-form";
import InputControlForm from "@/components/common/form/input-control-form";
import MainContentForm from "@/components/common/form/main-content-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { checkDuplicationMember, saveMember } from "@/lib/http/member-http";
import { formatDate } from "@/lib/utils/date-utils";
import { getErrMsgZod } from "@/lib/utils/zod-utils";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: styling form, must be responsive
export default function MemberForm({
  member = null,
  viewOnly = false,
}) {
  const formCreate = !viewOnly && !member
  const formUpdate = !viewOnly && member
  const formView = viewOnly && member

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

  const disableSubmitBtn = pendingSaved || !form.formState.isDirty

  useEffect(() => {
    if (saveData) {
      if (formCreate) {
        toast.success('Berhasil menambahkan data anggota baru')
      }

      if (formUpdate) {
        toast.success('Berhasil update data anggota')
      }

      setTimeout(() => {
        fetchSaveReset()

        router.push('/dashboard/members')
      }, 100)
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

  const onSubmit = async (data, e) => {
    const id = member ? member.id : null
    const mappedData = mapData(data)

    await runSaveMember({
      fetchFn: async () => await saveMember({ data: mappedData, id })
    })
  }

  const onReset = () => {
    form.reset()
  }
  
  // === Start Validation ===
  const validateFullName = (fullName) => {
    const schema = z.string().trim().min(1, 'Nama Lengkap tidak boleh kosong')

    const result = schema.safeParse(fullName)
    if (!result.success) return getErrMsgZod(result)

    return true
  }

  const validateEmail = async (email) => {
    const schema = z.email('Format email tidak sesuai')

    const result = schema.safeParse(email)
    if (!result.success) return getErrMsgZod(result)
    
    const id = member ? member.id : null
    const isDuplicate = await checkDuplicationMember({ field: 'email', value: email, id })
    if (isDuplicate) {
      return 'Email sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  }

  const validatePhone = async (phone) => {
    const schema = z.stringFormat('only-number', /^\d+$/).max(20, 'No Telepon tidak boleh melebihi 20 angka')

    const result = schema.safeParse(phone, {
      error: (iss) => {
        if (iss.format === 'only-number') {
          return 'No Telepon invalid: hanya boleh angka'
        }
      }
    })

    if (!result.success) return getErrMsgZod(result)

    const id = member ? member.id : null
    const isDuplicate = await checkDuplicationMember({ field: 'phone', value: phone, id })
    if (isDuplicate) {
      return 'No Telepon sudah digunakan, mohon untuk mengganti dengan yang lain'
    }

    return true
  }

  const validateGender = (gender) => {
    const schema = z.string().min(1, 'Jenis Kelamin tidak boleh kosong')

    const result = schema.safeParse(gender)
    if (!result.success) return getErrMsgZod(result)
  
    return true
  }
  
  const validateBirthDate = (birthDate) => {
    const schema = z.date({
      error: issue => issue.input === undefined ? "Tanggal lahir tidak boleh kosong" : "Format tanggal tidak sesuai"
    })

    const result = schema.safeParse(birthDate)
    if (!result.success) return getErrMsgZod(result)

    return true
  }

  const validateAddress = (address) => {
    const schema = z.string().trim().min(1, 'Alamat Lengkap tidak boleh kosong')

    const result = schema.safeParse(address)
    if (!result.success) return getErrMsgZod(result)

    return true
  }
  // === End Validation ===

  return (
    <MainContentForm
      useFormProp={form}
      className='grid gap-5'
      onSubmitForm={onSubmit}
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
          validate: validateFullName
        }}
        disabled={formView}
      />
      <CalendarControlForm 
        control={form.control}
        name='birthDate'
        label='Tanggal Lahir'
        isRequired={inputRequired}
        rules={{
          validate: validateBirthDate
        }}
        disabled={formView}
      />
      <SelectControlForm 
        control={form.control}
        name="gender"
        label="Jenis Kelamin"
        items={genderOpt}
        isRequired={inputRequired}
        rules={{
          validate: validateGender
        }}
        disabled={formView}
      />
      <InputControlForm 
        control={form.control}
        name="email"
        label="Email"
        isRequired={inputRequired}
        rules={{
          validate: validateEmail
        }}
        disabled={formView}
      />
      <InputControlForm 
        control={form.control}
        name="phone"
        label="No Telepon"
        isRequired={inputRequired}
        rules={{
          validate: validatePhone
        }}
        disabled={formView}
      />
      <TextareaControlForm 
        control={form.control}
        name="address"
        label="Alamat Lengkap"
        isRequired={inputRequired}
        rules={{
          validate: validateAddress
        }}
        disabled={formView}
      />
      <section className="mt-5 flex flex-col gap-4">
        {formUpdate && (
          <Button 
            variant='outline' 
            onClick={onReset}
            disabled={pendingSaved}
          >
            Reset
          </Button>
        )}
        {!formView && (
          <Button type="submit" disabled={disableSubmitBtn}>
            {pendingSaved && <Loader2Icon className="animate-spin" />}
            {pendingSaved 
              ? 'Mohon tunggu'
              : 'Simpan'
            }
          </Button>
        )}
      </section>
    </MainContentForm>
  )
}