'use client';

import CalendarControlForm from "@/components/common/form/calendar-control-form";
import InputControlForm from "@/components/common/form/input-control-form";
import MainContentForm from "@/components/common/form/main-content-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ROUTE } from "@/lib/constants/route";
import BookAlertDialogForm from "./alert-dialog/alert-dialog-form";
import ComboboxMultiControlForm from "@/components/common/form/combobox-multi-control-form";
import validateBook from "./validate";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import ButtonDisableDesc from "@/components/common/button/button-disable-desc";
import AlertMain from "@/components/common/alert-main";
import { canDeleteBook } from "@/lib/http/book-http";
import BookAlertDialogDelete from "./alert-dialog/alert-dialog-delete";

export default function BookForm({
  book = null,
  viewOnly = false,
  authorItems,
}) {
  const formType = 
    viewOnly && book 
      ? 'view'
      : !viewOnly && book
        ? 'update'
        : !viewOnly && !book
          ? 'create'
          : null

  const formTitle = formType === 'create' 
    ? 'Tambah Buku'
    : formType === 'update'
      ? 'Update Buku'
      : formType === 'view'
        ? 'Detail Buku'
        : 'Form Buku'

  const inputRequired = viewOnly ? false : true
  const inputDisabled = formType === 'view'

  const router = useRouter()

  const form = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      isbn: book?.isbn.toString() || '',
      title: book?.title.toString() || '',
      subTitle: book?.subTitle.toString() || '',
      publisher: book?.publisher.toString() || '',
      page: book?.page.toString() || '',
      edition: book?.edition.toString() || '',
      language: book?.language.toString() || '',
      authors: !book ? [] : book.authors.map((author) => ({ val: author.id, label: author.fullName })),
      publicationDate: book ? new Date(book.publicationDate) : undefined,
    },
  })

  const {
    error: errorCanDelete,
    runFetch: runFetchCanDataDeleted,
    fetchedData: canDelete,
  } = useFetch({ initialValue: true })

  useEffect(() => {
    const handleCheckDataCanDeleted = async () => {
      const id = book ? book.id : null
      await runFetchCanDataDeleted({ fetchFn: async () => await canDeleteBook({ id }) })
    }

    if (formType === 'view') {
      handleCheckDataCanDeleted()
    }
    
  }, [formType])

  const onSuccSubmit = () => {
    router.push(ROUTE.BOOKS.url)
  }

  const onReset = () => {
    form.reset()
  }

  const saveBtn = formType !== 'view'
    ? (
      <BookAlertDialogForm 
        form={form}
        formType={formType}
        formTitle={formTitle}
        book={book}
        onSuccSubmit={onSuccSubmit}
      />
    ) : undefined

  const resetBtn = formType === 'update'
    ? (
      <Button
        type="button" 
        variant='outline' 
        onClick={onReset}
      >
        Reset
      </Button>
    ) : undefined

  const deleteBtn = (formType === 'view' && !errorCanDelete) 
    ? canDelete
      ? (
          <BookAlertDialogDelete 
            bookId={book?.id}
            onSuccDelete={onSuccSubmit}
          />
      ) : (
        <ButtonDisableDesc
          desc="Tidak dapat dihapus, data buku sedang atau sudah selesai dipinjam"
          variant="destructive"
          labelClasses="text-destructive"
        >
          Hapus Buku
        </ButtonDisableDesc>
      )
    : undefined

  return (
    <MainContentForm
      useFormProp={form}
      className='grid gap-6'
      noValidate
    >
      <section className="flex flex-col gap-4">
        <div>
          {errorCanDelete && (
            <AlertMain 
              title="Error cek data buku" 
              variant="error"
            >
              <p>{errorCanDelete}</p>
            </AlertMain>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputControlForm
            control={form.control}
            name="title"
            label="Judul"
            isRequired={inputRequired}
            disabled={inputDisabled}
            rules={{
              validate: validateBook.title
            }}
          />
          <InputControlForm
            control={form.control}
            name="subTitle"
            label="Sub Judul"
            disabled={inputDisabled}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InputControlForm
            control={form.control}
            name="isbn"
            label="ISBN"
            isRequired={inputRequired}
            disabled={inputDisabled}
            rules={{
              validate: (isbn) => (validateBook.isbn(isbn, book?.id))
            }}
          />
          <ComboboxMultiControlForm 
            control={form.control}
            items={authorItems}
            name="authors"
            label="Pengarang"
            emptyLabel="Pengarang tidak ditemukan"
            placeholder="Pilih pengarang"
            disabled={inputDisabled}
          />
          <InputControlForm
            control={form.control}
            name="publisher"
            label="Penerbit"
            disabled={inputDisabled}
          />
          <CalendarControlForm 
            control={form.control}
            name='publicationDate'
            label='Tanggal Penerbitan'
            isRequired={inputRequired}
            disabled={inputDisabled}
            rules={{
              validate: validateBook.publicationDate
            }}
          />
          <InputControlForm
            type="number"
            control={form.control}
            name="edition"
            label="Edisi"
            disabled={inputDisabled}
            rules={{
              validate: validateBook.edition
            }}
          />
          <InputControlForm
            type="number"
            control={form.control}
            name="page"
            label="Halaman"
            disabled={inputDisabled}
            rules={{
              validate: validateBook.page
            }}
          />
          <InputControlForm
            control={form.control}
            name="language"
            label="Bahasa"
            disabled={inputDisabled}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 md:flex-row">
        {deleteBtn}
        {resetBtn}
        {saveBtn}
      </section>
    </MainContentForm>
  )
}