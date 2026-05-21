'use client'

import AlertDialogMain from "@/components/common/alert-dialog/alert-dialog-main"
import useFetch from "@/hooks/use-fetch"
import { DATE_PATTERN } from "@/lib/constants/date-pattern"
import { saveBook } from "@/lib/http/book-http"
import { format } from "date-fns"
import { useEffect } from "react"
import { toast } from "sonner"

export default function BookAlertDialogForm({
  form,
  book = null,
  onSuccSubmit,
  formTitle,
  formType = 'create'
}) {
  const desc = formType === 'create'
    ? 'Apakah Anda yakin untuk simpan data buku?'
    : formType === 'update'
      ? 'Apakah Anda yakin untuk update data?'
      : 'Form Buku'

  const {
    error: errorSaved,
    runFetch: runSaveBook,
    isPending: pendingSaved,
    fetchedData: saved,
    reset
  } = useFetch({ initialValue: undefined })

  const disableSubmitBtn = pendingSaved ||!form.formState.isDirty || !form.formState.isValid

  useEffect(() => {
    const handleSuccAction = () => {
      let msg =  ''
      
      if (saved && formType === 'create') {
        msg = 'Berhasil menambahkan data buku'
      }

      if (saved && formType === 'update') {
        msg = 'Berhasil memperbarui data buku'  
      }
  
      if (msg !== '') {
        toast.success(msg)
        
        setTimeout(() => {
          reset()
          onSuccSubmit()
        }, 200)
      }
    }

    const handleErrAction = () => {
      if (errorSaved !== '') {
        toast.error(errorSaved)
      }
    }

    handleSuccAction()
    handleErrAction()
  }, [saved, errorSaved])

  const mapData = ({ isbn, title, subTitle, publisher, page, edition, language, authors, publicationDate }) => {
    return {
      isbn,
      title,
      publicationDate: format(new Date(publicationDate), DATE_PATTERN.PRIMARY), 
      subTitle: subTitle.trim() !== '' ? subTitle.trim() : null,
      publisher: publisher.trim() !== '' ? publisher.trim() : null,
      language: language.trim() !== '' ? language.trim() : null,
      page: page.trim() !== '' ? parseInt(page) : null,
      edition: edition.trim() !== '' ? parseInt(edition) : null,
      authors: authors.map((author) => author.val).join(','),
    }
  }

  const onTrigger = (evt) => {
    form.trigger()

    if (!form.formState.isValid) {
      evt.preventDefault()
    }
  }

  const onSubmit = async () => {
    if (form.formState.isValid) {
      const id = book ? book.id : null

      const data = form.getValues()
      const mappedData = mapData(data)

      await runSaveBook({
        fetchFn: async () => await saveBook({ data: mappedData, id })
      })
    }
  }
    
  return (
    <AlertDialogMain
      title={formTitle}
      triggerLabel='Simpan'
      triggerDisabled={disableSubmitBtn}
      onTriggerClick={onTrigger}
      actionLabel="Simpan"
      cbAfterActionClicked={onSubmit}
    >
      {desc}
    </AlertDialogMain>
  )
}