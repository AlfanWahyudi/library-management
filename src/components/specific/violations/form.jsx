'use client'

import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";

import MainContentForm from "@/components/common/form/main-content-form";
import InputControlForm from "@/components/common/form/input-control-form";
import TextareaControlForm from "@/components/common/form/textarea-control-form";
import SelectControlForm from "@/components/common/form/select-control-form";
import ViolationAlertDialogForm from "./alert-dialog/alert-dialog-form";
import { VIOLATION_LEVEL } from "@/lib/constants/violation-level";
import validateAuthor from "./validate";
import ViolationAlertDialogDelete from "./alert-dialog/alert-dialog-delete";
import ButtonDisableDesc from "@/components/common/button/button-disable-desc";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import AlertMain from "@/components/common/alert-main";
import { canDeleteViolation } from "@/lib/http/violation-http";


export default function ViolationForm({
  openForm,
  cbSuccess = () => {},
  violation = null,
  viewOnly = false,
  children
}) {
  const formType = 
  viewOnly && violation 
    ? 'view'
    : !viewOnly && violation
      ? 'update'
      : !viewOnly && !violation
        ? 'create'
        : null

  const formTitle = formType === 'create' 
    ? 'Tambah Pelanggaran'
    : formType === 'update'
      ? 'Update Pelanggaran'
      : formType === 'view'
        ? 'Detail Pelanggaran'
        : 'Form Pelanggaran'


  const violationLevels = Object.entries(VIOLATION_LEVEL)
    .map(([key, value]) => ({ val: key, label: value }))

  const inputRequired = formType === 'view' ? false : true
  const inputDisabled = formType === 'view'

  const form = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      title: violation?.title || '',
      level: violation?.level || '',
      description: violation?.description || '',
    },
  })

  const {
    error: errorCanDelete,
    runFetch: runFetchCanDataDeleted,
    fetchedData: canDelete,
    reset: resetCanDelete,
  } = useFetch({ initialValue: true })

  useEffect(() => {

    // TODO: fix running fetch nya 2x
    const handleCheckDataCanDeleted = async () => {
      const id = violation ? violation.id : null
      await runFetchCanDataDeleted({ fetchFn: async () => await canDeleteViolation({ id }) })
    }

    if (openForm && formType === 'view') {
      handleCheckDataCanDeleted()
    } else {
      resetCanDelete()
    }
  }, [openForm, formType, violation])

  const saveBtn = formType !== 'view'
    ? (
      <ViolationAlertDialogForm 
        form={form}
        formTitle={formTitle}
        formType={formType}
        violation={violation}
        onSuccSubmit={cbSuccess}
      />
    ) : undefined

  const deleteBtn = (formType === 'view' && !errorCanDelete) 
    ? canDelete
      ? (
        <ViolationAlertDialogDelete 
          violation={violation}
          onSuccDelete={cbSuccess}
        />
      ) : (
        <ButtonDisableDesc
          desc="Tidak dapat dihapus, data pelanggaran telah digunakan."
          variant="destructive"
          labelClasses="text-destructive"
        >
          Hapus Pelanggaran
        </ButtonDisableDesc>
      )
    : undefined

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
        <div className="grid auto-rows-min gap-6 mb-10">
          {errorCanDelete && (
            <AlertMain 
              title="Error cek data pelanggaran" 
              variant="error"
            >
              <p>{errorCanDelete}</p>
            </AlertMain>
          )}
          <InputControlForm 
            control={form.control}
            name="title"
            label="Nama"
            rules={{
              validate: validateAuthor.title
            }}
            isRequired={inputRequired}
            disabled={inputDisabled}
          />
          <SelectControlForm 
            control={form.control}
            name="level"
            label="Level"
            placeholder="Pilih level"
            rules={{
              validate: validateAuthor.level
            }}
            isRequired={inputRequired}
            items={violationLevels}
            disabled={inputDisabled}
          />
          <TextareaControlForm 
            control={form.control}
            name="description"
            label="Deskripsi"
            rows={10}
            disabled={inputDisabled}
          />
        </div>
        {children}
      </section>
      <SheetFooter>
        {saveBtn}
        {deleteBtn}
        <SheetClose asChild>
          <Button type="button" size='sm' variant="outline">Tutup</Button>
        </SheetClose>
      </SheetFooter>
    </MainContentForm>
  )
}