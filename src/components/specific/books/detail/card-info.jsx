'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InfoItem from "@/components/common/info-item";
import { DATE_PATTERN } from "@/lib/constants/date-pattern"
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function CardBookInfo({ book }) {
  return(
    <Card>
      <CardHeader>
        <CardTitle>Buku</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <InfoItem title="Judul">
          <p>{book.title}</p>
        </InfoItem>
        <InfoItem title="Sub Judul">
          <p>{book.subTitle || "-"}</p>
        </InfoItem>
        <InfoItem title="ISBN">
          <p>{book.isbn}</p>
        </InfoItem>
        <InfoItem title="Pengarang">
          <p className="inline-flex gap-2">
            {
              book.authors.length == 0
                ? "-"
                : (
                    book.authors.map((author, idx) => (
                    <Badge key={idx} variant="secondary">{author.fullName}</Badge>
                  ))
                )
            }
          </p>
        </InfoItem>
        <InfoItem title="Edisi">
          <p>{book.edition || "-"}</p>
        </InfoItem>
        <InfoItem title="Penerbit">
          <p>{book.publisher || "-"}</p>
        </InfoItem>
        <InfoItem title="Tanggal Penerbitan">
          <p>{format(new Date(book.publicationDate), DATE_PATTERN.INDO_PRIMARY)}</p>
        </InfoItem>
        <InfoItem title="Bahasa">
          <p>{book.language || "-"}</p>
        </InfoItem>
        <InfoItem title="Halaman">
          <p>{book.page || "-"}</p>
        </InfoItem>
      </CardContent>
    </Card>
  )
}