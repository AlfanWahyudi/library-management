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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const genderOpt = [
  { val: 'm', label: 'Laki-Laki' }, 
  { val: 'f', label: 'Perempuan' }
]

//TODO: styling form, must be responsive
//TODO: handle after success create or update data
export default function MemberForm() {
  const form = useForm({
    criteriaMode: 'all',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      birthDate: undefined,
      gender: '',
    },
  })

  const {
    error: errorSaved,
    runFetch: runSaveMember,
    isPending: pendingSaved,
    fetchedData: member,
  } = useFetch({ initialValue: undefined })

  const {
    error: checkEmailError,
    runFetch: runCheckEmail,
    fetchedData: isEmailExist
  } = useFetch({ initialValue: undefined })

  const {
    error: checkPhoneError,
    runFetch: runCheckPhone,
    fetchedData: isPhoneExist
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved || !form.formState.isDirty || isEmailExist || isPhoneExist

  useEffect(() => {
    if (errorSaved) {
      toast.error(errorSaved)
    }

    if (isEmailExist) {
      form.trigger('email')
    } else {
      form.clearErrors('email')
    }

    if (isPhoneExist) {
      form.trigger('phone')
    } else {
      form.clearErrors('phone')
    }

  }, [errorSaved, isEmailExist, isPhoneExist])


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
    const mappedData = mapData(data)
    await runSaveMember({
      fetchFn: async () => await saveMember({ data: mappedData })
    })
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

    await runCheckEmail({
      fetchFn: async () => await checkDuplicationMember({ field: 'email', value: email })
    })

    if (isEmailExist) {
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

    await runCheckPhone({
      fetchFn: async () => await checkDuplicationMember({ field: 'phone', value: phone })
    })

    if (isPhoneExist) {
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
      <InputControlForm 
        control={form.control}
        name="fullName"
        label="Nama Lengkap"
        isRequired={true}
        rules={{
          validate: validateFullName
        }}
      />
      <CalendarControlForm 
        control={form.control}
        name='birthDate'
        label='Tanggal Lahir'
        isRequired={true}
        rules={{
          validate: validateBirthDate
        }}
      />
      <SelectControlForm 
        control={form.control}
        name="gender"
        label="Jenis Kelamin"
        items={genderOpt}
        isRequired={true}
        rules={{
          validate: validateGender
        }}
      />
      <InputControlForm 
        control={form.control}
        name="email"
        label="Email"
        isRequired={true}
        rules={{
          validate: validateEmail
        }}
      />
      <InputControlForm 
        control={form.control}
        name="phone"
        label="No Telepon"
        isRequired={true}
        rules={{
          validate: validatePhone
        }}
      />
      <TextareaControlForm 
        control={form.control}
        name="address"
        label="Alamat Lengkap"
        isRequired={true}
        rules={{
          validate: validateAddress
        }}
      />

        <Button 
          type="submit" 
          disabled={disableSubmitBtn}
        >
          {pendingSaved && <Loader2Icon className="animate-spin" />}
          {pendingSaved 
            ? 'Mohon tunggu'
            : 'Simpan'
          }
        </Button>
    </MainContentForm>
  )
}