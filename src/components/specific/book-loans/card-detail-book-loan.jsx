'use client'

import { format } from "date-fns";
import { DATE_PATTERN } from "@/lib/constants/date-pattern";
import InfoItem from "@/components/common/info-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER } from "@/lib/constants/gender";
import { Separator } from "@/components/ui/separator";

export default function CardDetailBookLoan({ book, member }) {
	return (
		<Card>
			<CardContent>
				<article>
					<h2 className="font-medium text-sm mb-3">Anggota</h2>
					<section className="grid md:grid-cols-2 gap-3">
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
					</section>
				</article>
				<Separator className="my-4" />
				<article>
					<h2 className="font-medium text-sm mb-3">Buku</h2>
					<section className="grid md:grid-cols-2 gap-3">
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
					</section>
				</article>
			</CardContent>
		</Card>
	)
}