'use client';

import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authorClientSchema } from "@/lib/schemas/author-schema";
import AlertMain from "@/components/common/alert-main";
import useFetch from "@/hooks/use-fetch";
import { deleteAuthor, saveAuthor } from "@/lib/http/author-http";
import { useEffect } from "react";
import { getAllCountry } from "@/lib/http/country-http";

import MainContentForm from "@/components/common/form/main-content-form";
import InputControlForm from "@/components/common/form/input-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import { Loader2Icon } from "lucide-react";
import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main";


//TODO: Fix ketika load data seluruh negara berat, jadi bisa dibikin loading info dulu, atau bagaimanapun biar tidak stack dulu ketika form nya kebuka
//TODO: Display Error ketika delete nya
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
    error: errorSaved,
    isPending: pendingSaved,
    runFetch: runSaveAuthor,
    fetchedData: saved,
  } = useFetch({ initialValue: undefined })


  const {
    error: errorCountry,
    runFetch: runFetchCountry,
    fetchedData: countries,
    reset: resetCountries,
  } = useFetch({ initialValue: [] })


  const {
    error: errorDelete,
    isPending: pendingDeleted,
    runFetch: runDelete,
    fetchedData: deleted,
  } = useFetch({ initialValue: undefined })


  useEffect(() => {
    const fetchingData = async () => {
      await runFetchCountry({ fetchFn: async() => await getAllCountry({}) })
    }

    if (openForm) {
      fetchingData()
    } else {
      resetCountries()
    }

    if (saved || deleted) {
      console.log(deleted)
      cbSuccess()
    }

    if (errorSaved || errorDelete) {
      // TODO: handle error nya
    }

  }, [openForm, saved, errorSaved, deleted, errorDelete])

  const onSubmit = async (data, e) => {
    const id = author !== null ? author.id : null

    if (!viewOnly) {
      await runSaveAuthor({ 
        fetchFn: async() => await saveAuthor({data, id})
      })
    }
  }
  
  const onDelete = async (id) => {
    await runDelete({
      fetchFn: async() => await deleteAuthor({ id })
    })
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
        {errorSaved !== '' && (
          <AlertMain title={errFormTitle} variant="error">
            <p>{errorSaved}</p>
          </AlertMain>  
        )}
        {errorCountry && (
          <AlertMain title='Error menampilkan daftar negara pada field kebangsaan' variant="error">
            <p>{errorCountry}</p>
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
          disabled={errorCountry || viewOnly}
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
          <Button type="submit" size='sm' disabled={pendingSaved}>
            {pendingSaved && <Loader2Icon className="animate-spin" />}
            {pendingSaved 
              ? 'Mohon tunggu'
              : 'Simpan'
            }
          </Button>
        )}
        {viewOnly && (
          <AlertDialogMain
            title='Hapus pengarang'
            triggerLabel='Hapus pengarang'
            actionLabel='Hapus'
            cbAfterActionClicked={async () => await onDelete(author?.id)}
          >
            Apakah anda yakin untuk menghapus pengarang ini?
          </AlertDialogMain>
        )}
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}