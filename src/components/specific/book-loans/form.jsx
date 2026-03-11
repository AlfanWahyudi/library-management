'use client';

import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import MainContentForm from "@/components/common/form/main-content-form";
import InputControlForm from "@/components/common/form/input-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import ButtonDisableDesc from "@/components/common/button/button-disable-desc";
import BookLoanAlertDialogForm from "./alert-dialog-form";

import { ComboboxItem } from "@/components/ui/combobox"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"
import ComboboxMultiControlForm from "@/components/common/form/combobox-multi-control-form";
import ComboboxSingleAsyncControlForm from "@/components/common/form/combobox-single-async-control-form";
import { searchableListMember } from "@/lib/http/member-http";

// TODO
export default function BookLoanForm() {
  const formTitle = 'Tambah peminjaman buku'

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    mode: 'onBlur',
    criteriaMode: 'all',
    // defaultValues: {
    //   fullName: author?.fullName || '',
    //   countryCode: author?.country.code || '',
    //   activeSince: author?.activeSince || '',
    //   about: author?.about || '',
    // },
    // resolver: zodResolver(authorClientSchema)
  })

  // const {
  //   error: errorCountry,
  //   runFetch: runFetchCountry,
  //   fetchedData: countries,
  //   reset: resetCountries,
  // } = useFetch({ initialValue: [] })

  // const {
  //   error: errorCanDelete,
  //   runFetch: runFetchCanDataDeleted,
  //   fetchedData: canDelete,
  //   reset: resetCanDelete,
  // } = useFetch({ initialValue: true })

  useEffect(() => {
    const handleCheckDataCanDeleted = async () => {
      // const id = author ? author.id : null
      // await runFetchCanDataDeleted({ fetchFn: async () => await canDeleteAuthor({ id }) })
    }

    const fetchingData = async () => {
      // await runFetchCountry({ fetchFn: async() => await getAllCountry({}) })
    }

    // if (openForm) {
    //   fetchingData()

    // } else {
      // resetCountries()
      // resetCanDelete()
    // }
    
  }, [])
  // }, [openForm, formType, author])

  const comboMemberItem = (item) => {
    return (
      <ComboboxItem key={item.id} value={item}>
        <Item size="xs" className="p-0">
          <ItemContent>
            <ItemTitle className="whitespace-nowrap">
              {item.fullName}
            </ItemTitle>
            <ItemDescription>
              {item.email}
            </ItemDescription>
          </ItemContent>
        </Item>
      </ComboboxItem>
    )
  }

  return (
    <MainContentForm 
      useFormProp={form} 
      className="grid gap-6"
      noValidate
    >
      <section className="flex-1 px-4">
        <div className='grid auto-rows-min gap-6 mb-10'>
          {/* {errorCountry && (
            <AlertMain title='Error menampilkan daftar negara pada field kebangsaan' variant="error">
              <p>{errorCountry}</p>
            </AlertMain>  
          )}
          {errorCanDelete && (
            <AlertMain 
              title="Error cek data pengarang" 
              variant="error"
            >
              <p>{errorCanDelete}</p>
            </AlertMain>
          )} */}
          {/* <InputControlForm 
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
          /> */}
          <ComboboxSingleAsyncControlForm 
            control={form.control}
            name="member"
            label="Anggota"
            placeholder="Cari anggota"
            objLabel='fullName'
            itemKey='id'
            customItem={comboMemberItem}
            resourceHttp={async (query) => await searchableListMember({ search: query })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <InputControlForm 
              control={form.control}
              name="startDate"
              label='Tanggal Mulai'
              value="11-03-2026"
              disabled={true}
            />
            <InputControlForm 
              control={form.control}
              name="endDate"
              label='Tanggal Selesai'
              value="18-03-2026"
              disabled={true}
            />
          </div>
        </div>
      </section>
      <section>
        <BookLoanAlertDialogForm 
          form={form}
          formTitle={formTitle}
        />
      </section>
    </MainContentForm>
  )
}