'use client';

import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authorClientSchema } from "@/lib/schemas/author/author-client-schema";
import AlertMain from "@/components/common/alert-main";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { getAllCountry } from "@/lib/http/country-http";

import MainContentForm from "@/components/common/form/main-content-form";
import InputControlForm from "@/components/common/form/input-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import AuthorAlertDialogForm from "./alert-dialog/alert-dialog-form";
import AuthorAlertDialogDelete from "./alert-dialog/alert-dialog-delete";

//TODO: Fix ketika load data seluruh negara berat, jadi bisa dibikin loading info dulu, atau bagaimanapun biar tidak stack dulu ketika form nya kebuka
//TODO: Styling untuk input yang digunakan pada Detail View
export default function AuthorForm({
  openForm,
  cbSuccess = () => {},
  author = null,
  viewOnly = false,
  children,
}) {
  const formType = 
  viewOnly && author 
    ? 'view'
    : !viewOnly && author
      ? 'update'
      : !viewOnly && !author
        ? 'create'
        : null

  const formTitle = formType === 'create' 
    ? 'Tambah pengarang'
    : formType === 'update'
      ? 'Update pengarang'
      : formType === 'view'
        ? 'Detail pengarang'
        : 'Form pengarang'

  const inputRequired = viewOnly ? false : true
  const inputDisabled = formType === 'view'

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    defaultValues: {
      fullName: author?.fullName || '',
      countryCode: author?.country.code || '',
      activeSince: author?.activeSince || '',
      about: author?.about || '',
    },
    resolver: zodResolver(authorClientSchema)
  })

  const {
    error: errorCountry,
    runFetch: runFetchCountry,
    fetchedData: countries,
    reset: resetCountries,
  } = useFetch({ initialValue: [] })

  useEffect(() => {
    const fetchingData = async () => {
      await runFetchCountry({ fetchFn: async() => await getAllCountry({}) })
    }

    if (openForm) {
      fetchingData()

    } else {
      resetCountries()
    }
  }, [openForm])

  return (
    <MainContentForm 
      useFormProp={form} 
      className="flex-1 flex flex-col gap-4"
      noValidate
    >
      <SheetHeader>
        <SheetTitle>{formTitle}</SheetTitle>
      </SheetHeader>
      <section className="flex-1 px-4">
        <div className='grid auto-rows-min gap-6 mb-10'>
          {errorCountry && (
            <AlertMain title='Error menampilkan daftar negara pada field kebangsaan' variant="error">
              <p>{errorCountry}</p>
            </AlertMain>  
          )}
          <InputControlForm 
            control={form.control}
            name="fullName"
            label="Nama Lengkap"
            isRequired={inputRequired}
            disabled={inputDisabled}
          />
          <SelectControlForm 
            control={form.control}
            name="countryCode"
            label="Kebangsaan"
            isRequired={inputRequired}
            placeholder="Pilih kebangsaan"
            items={countries.map((country) => ({ val: country.code, label: country.name }))}
            disabled={errorCountry || inputDisabled}
          />
          <InputControlForm 
            control={form.control}
            name="activeSince"
            label="Aktif Sejak"
            type="number"
            disabled={inputDisabled}
          />
          <TextareaControlForm 
            control={form.control}
            name="about"
            label="Tentang"
            rows={10}
            disabled={inputDisabled}
          />
        </div>
        {children}
      </section>
      <SheetFooter>
        {formType !== 'view' && (
          <AuthorAlertDialogForm 
            form={form}
            formTitle={formTitle}
            formType={formType}
            author={author}
            onSuccSubmit={cbSuccess}
          />
        )}
        {formType === 'view' && (
          <AuthorAlertDialogDelete 
            formType={formType}
            author={author}
            onSuccDelete={cbSuccess}
          />
        )}
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}