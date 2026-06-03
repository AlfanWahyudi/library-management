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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER } from "@/lib/constants/gender";
import BookLoanCompleteAlertDialogForm from "./alert-dialog-form";
import { ComboboxItem } from "@/components/ui/combobox";
import { Separator } from "@/components/ui/separator";
import CardDetailBookLoan from "../card-detail-book-loan";
import CardCompleteBookLoan from "./card-complete-book-loan";

export default function BookLoanCompleteForm({ bookLoan }) {
  const {book, member} = bookLoan

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at onceAsti Musman

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
      className="flex flex-col justify-center"
      noValidate
    >
      <TitlePage>Penyelesaian Pinjaman Buku</TitlePage>
      <section className="grow flex flex-col gap-8 md:flex-row">
        <section className="grow">
          <CardDetailBookLoan book={book} member={member} />
        </section>
        <section className="grow md:max-w-1/4">
          <CardCompleteBookLoan form={form} bookLoan={bookLoan} onSuccSubmit={onSuccSubmit} />
        </section>
      </section>
    </MainContentForm>
  )
}