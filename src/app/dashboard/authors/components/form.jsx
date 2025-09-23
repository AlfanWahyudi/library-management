'use client';


import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authorClientSchema } from "@/lib/schemas/author-schema";
import AlertMain from "@/components/alert-main";
import useFetch from "@/hooks/use-fetch";
import { saveAuthor } from "@/lib/http/author-http";
import { useEffect } from "react";
import { getAllCountry } from "@/lib/http/country-http";

import MainContentForm from "@/components/form/main-content-form";
import InputControlForm from "@/components/form/input-control-form";
import TextareaControlForm from "@/components/form/textarea-control-form";
import SelectControlForm from "@/components/form/select-control-form";


//TODO: Fix ketika load data seluruh negara berat, jadi bisa dibikin loading info dulu, atau bagaimanapun biar tidak stack dulu ketika form nya kebuka
//TODO: Tampilkan isi form sesuai dengan Update, dan Detail Author nya,
//TODO: Feat Update
//TODO: Feat Delete
//TODO: display selected kebangsaan
//TODO: Styling untuk input yang digunakan pada Detail View
export default function AuthorForm({
  openForm,
  cbSuccess = () => {},
  author = null,
  title,
  viewOnly = false,
  children
}) {
  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    defaultValues: {
      fullName: '',
      countryCode: '',
      activeSince: null,
      about: null,
    },
    resolver: zodResolver(authorClientSchema)
  })


  const {
    error: authorError,
    isPending,
    runFetch: runFetchAuthor,
  } = useFetch({ initialValue: undefined })


  const {
    error: countryErr,
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


  const onSubmit = async (data, e) => {
    await runFetchAuthor({ 
      fetchFn: async() => await saveAuthor({data}), 
      onSuccess: () => {
        cbSuccess()
      },
    })
  }

  return (
    <MainContentForm 
      useFormProp={form} 
      onSubmitForm={onSubmit} 
      className="flex-1 flex flex-col"
      noValidate
    >
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        {authorError !== '' && (
          <AlertMain title='Error form tambah pengarang' variant="error">
            <p>{authorError}</p>
          </AlertMain>  
        )}
        {countryErr && (
          <AlertMain title='Error menampilkan daftar negara pada field kebangsaan' variant="error">
            <p>{countryErr}</p>
          </AlertMain>  
        )}
        {!viewOnly && (
          <InputControlForm 
            useFormProp={form}
            name="fullName"
            label="Nama Lengkap"
            isRequired={true}
            value={author?.fullName}
          />
        )}
        <SelectControlForm 
          useFormProp={form}
          name="countryCode"
          label="Kebangsaan"
          isRequired={true}
          placeholder="Pilih kebangsaan"
          items={countries.map((country) => ({ val: country.code, label: country.name }))}
          disabled={countryErr || viewOnly}
          value={author?.country.code}
        />
        <InputControlForm 
          useFormProp={form}
          name="activeSince"
          label="Aktif Sejak"
          type="number"
          disabled={viewOnly}
          value={author?.activeSince}
        />
        <TextareaControlForm 
          useFormProp={form}
          name="about"
          label="Tentang"
          rows={10}
          disabled={viewOnly}
          value={author?.about}
        />
      </div>
      {children}
      <SheetFooter>
        {!viewOnly && (
          <Button type="submit">
            {isPending ? 'Submitted...' : 'Simpan'}
          </Button>
        )}
        {viewOnly && (
          <Button type="submit" variant='destructive' disabled>
            {isPending ? 'Submitted...' : 'Hapus'}
          </Button>
        )}
        <SheetClose asChild>
          <Button type="button" variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}