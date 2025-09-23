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
import { Loader2Icon } from "lucide-react";


//TODO: Fix ketika load data seluruh negara berat, jadi bisa dibikin loading info dulu, atau bagaimanapun biar tidak stack dulu ketika form nya kebuka
//TODO: Feat Delete
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
      fullName: author?.fullName || '',
      countryCode: author?.country.code || '',
      activeSince: author?.activeSince || '',
      about: author?.about || '',
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
    const id = author !== null ? author.id : null

    if (!viewOnly) {
      await runFetchAuthor({ 
        fetchFn: async() => await saveAuthor({data, id}), 
        onSuccess: () => {
          cbSuccess()
        },
      })
    } else {
      //TODO: handle delete author nya
    }
  }

  let errFormTitle = 'Error menyimpan data pengarang baru'
  if (viewOnly) {
    errFormTitle = 'Error menghapus data pengarang'
  } else if (!viewOnly && author !== null) {
    errFormTitle = 'Error memperbarui data pengarang'
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
          <AlertMain title={errFormTitle} variant="error">
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
        />
        <InputControlForm 
          useFormProp={form}
          name="activeSince"
          label="Aktif Sejak"
          type="number"
          disabled={viewOnly}
        />
        <TextareaControlForm 
          useFormProp={form}
          name="about"
          label="Tentang"
          rows={10}
          disabled={viewOnly}
        />
      </div>
      {children}
      <SheetFooter>
        {!viewOnly && (
          <Button type="submit" size='sm' disabled={isPending}>
            {isPending && <Loader2Icon className="animate-spin" />}
            {isPending 
              ? 'Mohon tunggu'
              : 'Simpan'
            }
          </Button>
        )}
        {viewOnly && (
          <Button 
            type="submit" 
            size='sm' 
            variant='destructive' 
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            {isPending 
              ? 'Mohon tunggu' 
              : 'Hapus'
            }
          </Button>
        )}
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}