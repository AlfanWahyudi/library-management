'use client'

import { DATE_PATTERN } from "@/lib/constants/date-pattern"
import { DATETIME_PATTERN } from "@/lib/constants/datetime-pattern"
import { GENDER } from "@/lib/constants/gender"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InfoItem from "@/components/common/info-item";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import InfoTimestamp from "@/components/common/info-timestamp";

export default function CardMemberInfo({ member }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anggota</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          <InfoItem title="Nama Lengkap">
            <p>{member.fullName}</p>
          </InfoItem>
          <InfoItem title="Email">
            <p>{member.email}</p>
          </InfoItem>
          <InfoItem title="Tanggal Lahir">
            <p>{format(new Date(member.birthDate), DATE_PATTERN.INDO_PRIMARY) }</p>
          </InfoItem>
          <InfoItem title="Jenis Kelamin">
            <p>{GENDER[member.gender]}</p>
          </InfoItem>
          <InfoItem title="No Telepon">
            <p>{member.phone}</p>
          </InfoItem>
          <InfoItem title="Alamat Lengkap">
            <p>{member.address}</p>
          </InfoItem>
        </section>
        <Separator />
        <InfoTimestamp 
          createdAt={member.createdAt} 
          updatedAt={member.updatedAt} 
        />
      </CardContent>
    </Card>
  )
}