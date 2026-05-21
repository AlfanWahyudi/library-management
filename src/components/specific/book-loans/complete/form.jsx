'use client'

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";

import MainContentForm from "@/components/common/form/main-content-form";

import { Item, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item"
import ComboboxMultiControlForm from "@/components/common/form/combobox-multi-control-form";
import AlertMain from "@/components/common/alert-main";
import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/lib/constants/route";
import InfoItem from "@/components/common/info-item";
import TitlePage from "@/components/common/title-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER } from "@/lib/constants/gender";
import BookLoanCompleteAlertDialogForm from "./alert-dialog-form";
import { ComboboxItem } from "@/components/ui/combobox";

//TODO: Rapihkan tampilan -> layout, color, font size, dll. (responsive)
//TODO: Rapihkan code
export default function BookLoanCompleteForm({ bookLoan }) {
  const {startDate, endDate, book, member} = bookLoan

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
    },
  })

  const router = useRouter()

  const onSuccSubmit = () => {
    router.push(ROUTE.BOOK_LOANS.url)
  }

  const comboViolItem = (item) => {
    return (
      <ComboboxItem key={item.val} value={item}>
        <Item size="xs" className="flex-1 p-0">
          <ItemContent>
            <ItemTitle className="whitespace-nowrap font-medium">
              {item.label}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Badge variant="secondary">{item.level}</Badge>
          </ItemActions>
        </Item>
      </ComboboxItem>
    )
  }

  return (
    <MainContentForm
      useFormProp={form} 
      className="flex justify-center"
      noValidate
    >
      <section className="grow max-w-4xl flex flex-col mt-2">
        <TitlePage>Penyelesaian Pinjaman Buku</TitlePage>
        <section className="flex flex-col gap-5 mb-5">
          <Card className="shadow-xs">
            <CardHeader>
              <CardTitle>Anggota</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoItem title="Nama Lengkap">
                <p>{member.fullName}</p>
              </InfoItem>
              <InfoItem title="Email">
                <p>{member.email}</p>
              </InfoItem>
              <InfoItem title="Tanggal Lahir">
                <p>{format(new Date(member.birthDate), DATE_PATTERN.INDO_PRIMARY)}</p>
              </InfoItem>
              <InfoItem title="Jenis Kelamin">
                <p>{GENDER[member.gender]}</p>
              </InfoItem>
              <InfoItem title="No Telepon">
                <p>{member.phone}</p>
              </InfoItem>
              <InfoItem title="Alamat">
                <p>{member.address}</p>
              </InfoItem>
            </CardContent>
          </Card>
          <Card className="shadow-xs">
            <CardHeader>
              <CardTitle>Buku</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoItem title="Judul">
                <p>{book.title}</p>
              </InfoItem>
              <InfoItem title="Sub Judul">
                <p>{book.subTitle || '-'}</p>
              </InfoItem>
              <InfoItem title="ISBN">
                <p>{book.isbn}</p>
              </InfoItem>
              <InfoItem title="Pengarang">
                <p className="inline-flex gap-2">
                  {book.authors.map((author, idx) => (
                    <Badge key={idx} variant="secondary">{author.fullName}</Badge>
                  ))}
                </p>
              </InfoItem>
              <InfoItem title="Penerbit">
                <p>{book.publisher || '-'}</p>
              </InfoItem>
              <InfoItem title="Tanggal Penerbitan">
                <p>{format(new Date(book.publicationDate), DATE_PATTERN.INDO_PRIMARY)}</p>
              </InfoItem>
              <InfoItem title="Edisi">
                <p>{book.edition || '-'}</p>
              </InfoItem>
              <InfoItem title="Bahasa">
                <p>{book.language || '-'}</p>
              </InfoItem>
              <InfoItem title="Halaman">
                <p>{book.page || '-'}</p>
              </InfoItem>
            </CardContent>
          </Card>
          <section className="flex flex-col gap-3">
            <InfoItem title="Tanggal Pinjam">
              {format(new Date(startDate), DATE_PATTERN.INDO_PRIMARY)}
            </InfoItem>
            <InfoItem title="Tanggal Wajib Kembali">
              {format(new Date(endDate), DATE_PATTERN.INDO_PRIMARY)}
            </InfoItem>
          </section>
        </section>
        <section className="flex justify-end">
          <BookLoanCompleteAlertDialogForm
            bookLoan={bookLoan} 
            form={form}
            onSuccSubmit={onSuccSubmit}
          />
        </section>
      </section>
    </MainContentForm>
  )
}