'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";

import MainContentForm from "@/components/common/form/main-content-form";
import InputControlForm from "@/components/common/form/input-control-form";
import BookLoanAlertDialogForm from "./alert-dialog-form";

import { ComboboxCollection, ComboboxGroup, ComboboxItem, ComboboxLabel, ComboboxSeparator } from "@/components/ui/combobox"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import ComboboxMultiControlForm from "@/components/common/form/combobox-multi-control-form";
import ComboboxSingleAsyncControlForm from "@/components/common/form/combobox-single-async-control-form";
import { searchableIncludeLoanListMember } from "@/lib/http/member-http";
import { listIncludeLoan } from "@/lib/http/book-http";
import AlertMain from "@/components/common/alert-main";
import { BOOK_LOAN } from "@/lib/constants/book-loan";
import { Badge } from "@/components/ui/badge";
import validateBookLoan from "./validate";
import { add, endOfDay, format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import useAutoRefreshAtMidnight from "@/hooks/use-auto-refresh-at-midnight";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/lib/constants/route";

// TODO: rapihkan tampilan (responsive)
// TODO: rapihkan code
export default function BookLoanForm() {
  const formTitle = 'Tambah peminjaman buku'

  const [books, setBooks] = useState([])
  const [isPending, startTransition] = useTransition()
  const [booksError, setBooksError] = useState(null)

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      member: null,
      books: [],
    },
  })

  useAutoRefreshAtMidnight()

  const router = useRouter()

  const startDate = new Date()
  const endDate = new Date(endOfDay(add(startDate, { days: BOOK_LOAN.PERIOD_DAY })))

  useEffect(() => {
    const fetchingBooks = () => {
      startTransition(async () => {
        setBooksError(null)

        try {
          const data = await listIncludeLoan({ orderBy: 'title' })

          const onLoan = {
            name: 'onLoan',
            value: `Sedang dipinjam (${data.meta.totalOnLoan})`,
            items: data.onLoan.map((item) => ({ val: item.id, label: item.title, isLoaned: item.isLoaned })),
          }

          const avail = {
            name: 'avail',
            value: `Dapat dipinjam (${data.meta.totalAvail})`,
            items: data.avail.map((item) => ({ val: item.id, label: item.title, isLoaned: item.isLoaned })),
          }

          startTransition(() => {
            setBooks([avail, onLoan])
          })
          
        } catch (error) {
          setBooksError(error.message)
        }
      })
    }

    if (books.length === 0) {
      fetchingBooks()
    }

  }, [form.formState])


  useEffect(() => {
    const selectedBooks = form.getValues('books')
    const memberState = form.getFieldState('member')
    if (memberState.isDirty && selectedBooks.length > 0) {
      console.log('form akan di trigger nih')
      form.trigger('books')
    }
  }, [form.formState])

  const onSuccSubmit = () => {
    router.push(ROUTE.BOOK_LOANS.url)
  }

  const comboMemberItem = (item) => {
    const memberReachMaxLoan = item.bookOnLoanCount == BOOK_LOAN.MAX

    return (
      <ComboboxItem key={item.id} value={item} disabled={memberReachMaxLoan}>
        <Item size="xs" className="flex-1 p-0">
          <ItemContent>
            <ItemTitle className="whitespace-nowrap">
              {item.fullName}
            </ItemTitle>
            <ItemDescription>
              {item.email}
            </ItemDescription>
          </ItemContent>
          {memberReachMaxLoan && (
            <ItemActions>
              <Badge variant="destructive">Mencapai Maksimum Peminjaman</Badge>
            </ItemActions>
          )}
        </Item>
      </ComboboxItem>
    )
  }

  const comboBookItem = (group, index) => {
    const displaySeparator = (group.name === 'avail' && books[1].items.length !== 0)
    return (
      <ComboboxGroup key={group.value} items={group.items}>
        <ComboboxLabel>{group.value}</ComboboxLabel>
        <ComboboxCollection>
          {(item) => (
            <ComboboxItem key={item.val} value={item} disabled={item.isLoaned}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxCollection>
        {displaySeparator && <ComboboxSeparator />}
      </ComboboxGroup>
    )
  }

  return (
    <MainContentForm 
      useFormProp={form} 
      className="grid gap-6"
      noValidate
    >
      <section className="flex-1">
        <div className='grid auto-rows-min gap-6'>
          {booksError && (
            <AlertMain title={`Error menampilkan daftar buku, pada pilihan "Buku"`} variant="error">
              <p>{booksError}</p>
            </AlertMain>  
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <ComboboxSingleAsyncControlForm 
              control={form.control}
              name="member"
              label="Anggota"
              placeholder="Cari anggota..."
              objLabel='fullName'
              itemKey='id'
              customItem={comboMemberItem}
              resourceHttp={async (query) => await searchableIncludeLoanListMember({ search: query })}
              isRequired={true}
              rules={{
                validate: validateBookLoan.member
              }}
            />
            <ComboboxMultiControlForm
              control={form.control}
              name="books"
              label="Buku"
              items={books}
              emptyLabel="Buku tidak ditemukan"
              placeholder="Pilih buku"
              isRequired={true}
              customItem={comboBookItem}
              rules={{
                validate: (val) => validateBookLoan.book(val, form.getValues('member'))
              }}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InputControlForm 
              control={form.control}
              name="startDate"
              label='Tanggal Mulai'
              value={format(startDate, DATE_PATTERN.INDO_PRIMARY)}
              disabled={true}
            />
            <InputControlForm 
              control={form.control}
              name="endDate"
              label='Tanggal Selesai'
              value={format(endDate, DATE_PATTERN.INDO_PRIMARY)}
              disabled={true}
            />
          </div>
        </div>
      </section>
      <section>
        <BookLoanAlertDialogForm 
          form={form}
          formTitle={formTitle}
          onSuccSubmit={onSuccSubmit}
        />
      </section>
    </MainContentForm>
  )
}