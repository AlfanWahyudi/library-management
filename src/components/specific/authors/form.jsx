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
import { toast } from "sonner";


//TODO: Fix ketika load data seluruh negara berat, jadi bisa dibikin loading info dulu, atau bagaimanapun biar tidak stack dulu ketika form nya kebuka
//TODO: Styling untuk input yang digunakan pada Detail View
export default function AuthorForm({
  openForm,
  cbSuccess = () => {},
  author = null,
  viewOnly = false,
  children,
}) {
  const formCreate = !viewOnly && !author
  const formUpdate = !viewOnly && author
  const formView = viewOnly && author

  const formTitle = formCreate 
    ? 'Tambah pengarang'
    : formUpdate
      ? 'Update pengarang'
      : formView
        ? 'Detail pengarang'
        : 'Form pengarang'

  const inputRequired = viewOnly ? false : true

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

    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved && formCreate) {
        msg = 'Berhasil menambahkan data pengarang'
      }

      if (saved && formUpdate) {
        msg = 'Berhasil memperbarui data pengarang'  
      }
  
      if (deleted && formView) {
        msg = 'Berhasil menghapus data pengarang'
      }
      
      if (msg !== '') {
        cbSuccess()

        setTimeout(() => {
          toast.success(msg)
        }, 200)
      }
    }

    const handleErrAction = () => {
      const msg = errorSaved || errorDelete
      if (msg !== '') {
        toast.error(msg)
      }
    }

    if (openForm) {
      fetchingData()

      handleSuccAction()
      handleErrAction()
    } else {
      resetCountries()
    }
  }, [openForm, saved, errorSaved, deleted, errorDelete])

  const onSubmit = async (data, e) => {
    const id = author !== null ? author.id : null

    if (!formView) {
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
      <section className="flex-1 px-4">
        <div className='grid auto-rows-min gap-6 mb-10'>
          {errorCountry && (
            <AlertMain title='Error menampilkan daftar negara pada field kebangsaan' variant="error">
              <p>{errorCountry}</p>
            </AlertMain>  
          )}
          <InputControlForm 
            useFormProp={form}
            name="fullName"
            label="Nama Lengkap"
            isRequired={inputRequired}
            disabled={formView}
          />
          <SelectControlForm 
            useFormProp={form}
            name="countryCode"
            label="Kebangsaan"
            isRequired={inputRequired}
            placeholder="Pilih kebangsaan"
            items={countries.map((country) => ({ val: country.code, label: country.name }))}
            disabled={errorCountry || formView}
          />
          <InputControlForm 
            useFormProp={form}
            name="activeSince"
            label="Aktif Sejak"
            type="number"
            disabled={formView}
          />
          <TextareaControlForm 
            useFormProp={form}
            name="about"
            label="Tentang"
            rows={10}
            disabled={formView}
          />
        </div>
        {children}
      </section>
      <SheetFooter>
        {!formView && (
          <Button type="submit" size='sm' disabled={pendingSaved}>
            {pendingSaved && <Loader2Icon className="animate-spin" />}
            {pendingSaved 
              ? 'Mohon tunggu'
              : 'Simpan'
            }
          </Button>
        )}
        {formView && (
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