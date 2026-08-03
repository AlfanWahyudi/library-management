import ContentHead from "@/components/specific/content-head"
import CardCompareAddDelBook from "@/components/specific/dashboard/card-compare-add-del-book"
import CardLoanYearAllDash from "@/components/specific/dashboard/card-loan-year-all-dash"
import CardTopLoanedBook from "@/components/specific/dashboard/card-top-loaned-book"
import CardTopMemberLoan from "@/components/specific/dashboard/card-top-member-loan"
import CardTotalDash from "@/components/specific/dashboard/card-total-dash"
import ChartLoanDash from "@/components/specific/dashboard/chart-loan-dash"
import { Button } from "@/components/ui/button"
import { ROUTE } from "@/lib/constants/route"
import BookLoanService from "@/lib/services/book-loan-service"
import BookService from "@/lib/services/book-service"
import MemberService from "@/lib/services/member-service"
import { BookIcon, BookUpIcon, UsersIcon } from "lucide-react"

const rightContentItem = (
  <>
    <Button variant='outline'>Contoh Btn 1</Button>
    <Button>Contoh Btn 2</Button>
  </>
)

const breadcrumbItems = [
  {...ROUTE.DASHBOARD}
]

// TODO: visualize chart data
export default async function DashboardPage({}) {
  const totalBookLoan = await BookLoanService.calcTotal()
  const totalMember = await MemberService.calcTotal()
  const totalBook = await BookService.calcTotal()
  const totalInfoData = [
    {
      name: "Total Peminjaman",
      total: totalBookLoan,
      icon: <BookUpIcon />
    },
    {
      name: "Total Buku",
      total: totalBook,
      icon: <BookIcon />
    },
    {
      name: "Total Anggota",
      total: totalMember,
      icon: <UsersIcon />
    },
  ]

  // const chartCompleteYearAll = await BookLoanService.chartTotalCompleteAll()
  // TODO: get data from DB
  const chartLoanYearAllData = {
    config: {
      loan: {
        label: "Total Peminjaman",
        color: "var(--chart-1)", //TODO: change the color
      },
      member: {
        label: "Total Anggota",
        color: "var(--chart-2)", //TODO: change the color
      },
      bookKey: {
        label: "Total Buku",
        color: "var(--chart-3)", //TODO: change the color
      },
    },
    data: [
      {
        name: '2026',
        loan: 60,
        member: 10,
        book: 6,
      },
      {
        name: '2025',
        loan: 113,
        member: 25,
        book: 31,
      },
      {
        name: '2024',
        loan: 108,
        member: 40,
        book: 31,
      },
      {
        name: '2023',
        loan: 110,
        member: 20,
        book: 10,
      },
      {
        name: '2022',
        loan: 120,
        member: 33,
        book: 20,
      },
      {
        name: '2021',
        loan: 103,
        member: 24,
        book: 15,
      },
      {
        name: '2020',
        loan: 101,
        member: 38,
        book: 34,
      },
      {
        name: '2019',
        loan: 92,
        member: 43,
        book: 28,
      },
      {
        name: '2018',
        loan: 80,
        member: 18,
        book: 30,
      },
      {
        name: '2017',
        loan: 75,
        member: 35,
        book: 17,
      },
      {
        name: '2016',
        loan: 85,
        member: 24,
        book: 16,
      },
      {
        name: '2015',
        loan: 123,
        member: 30,
        book: 21,
      },
      {
        name: '2014',
        loan: 100,
        member: 32,
        book: 34,
      },
      {
        name: '2013',
        loan: 80,
        member: 12,
        book: 10,
      },
      {
        name: '2012',
        loan: 68,
        member: 23,
        book: 23,
      },
      {
        name: '2011',
        loan: 76,
        member: 20,
        book: 10,
      },
      {
        name: '2010',
        loan: 66,
        member: 50,
        book: 125,
      },
    ],
  }

  // TODO: get data from DB
  const chartTopMemberLoanBookExample = {
    config: {
      totalLoan: {
        label: "Total Pinjaman"
      },
      mem1: {
        label: "Member 1",
        color: "var(--chart-2)",
      },
      mem2: {
        label: "Member 2",
        color: "var(--chart-2)",
      },
      mem3: {
        label: "Member 3",
        color: "var(--chart-2)",
      },
      mem4: {
        label: "Member 4",
        color: "var(--chart-2)",
      },
      mem5: {
        label: "Member 5",
        color: "var(--chart-2)",
      },
      mem6: {
        label: "Member 6",
        color: "var(--chart-2)",
      },
      mem7: {
        label: "Member 7",
        color: "var(--chart-2)",
      },
      mem8: {
        label: "Member 8",
        color: "var(--chart-2)",
      },
      mem9: {
        label: "Member 9",
        color: "var(--chart-2)",
      },
      mem10: {
        label: "Member 10",
        color: "var(--chart-2)",
      },
    },
    data: [
      { key: "mem1", totalLoan: 50, },
      { key: "mem2", totalLoan: 45, },
      { key: "mem3", totalLoan: 42, },
      { key: "mem4", totalLoan: 40, },
      { key: "mem5", totalLoan: 40, },
      { key: "mem6", totalLoan: 40, },
      { key: "mem7", totalLoan: 36, },
      { key: "mem8", totalLoan: 33, },
      { key: "mem9", totalLoan: 20, },
      { key: "mem10", totalLoan: 20, },
    ],
  }

  // TODO: get data from DB
  const chartTopLoanedBookDataExample = {
    config: {
      totalLoaned: {
        label: "Total yang dipinjam"
      },
      book1: {
        label: "Book 1",
        color: "var(--chart-2)",
      },
      book2: {
        label: "Book 2",
        color: "var(--chart-2)",
      },
      book3: {
        label: "Book 3",
        color: "var(--chart-2)",
      },
      book4: {
        label: "Book 4",
        color: "var(--chart-2)",
      },
      book5: {
        label: "Book 5",
        color: "var(--chart-2)",
      },
      book6: {
        label: "Book 6",
        color: "var(--chart-2)",
      },
      book7: {
        label: "Book 7",
        color: "var(--chart-2)",
      },
      book8: {
        label: "Book 8",
        color: "var(--chart-2)",
      },
      book9: {
        label: "Book 9",
        color: "var(--chart-2)",
      },
      book10: {
        label: "Book 10",
        color: "var(--chart-2)",
      },
    },
    data: [
      { key: "book1", totalLoaned: 60, },
      { key: "book2", totalLoaned: 55, },
      { key: "book3", totalLoaned: 55, },
      { key: "book4", totalLoaned: 52, },
      { key: "book5", totalLoaned: 41, },
      { key: "book6", totalLoaned: 40, },
      { key: "book7", totalLoaned: 38, },
      { key: "book8", totalLoaned: 37, },
      { key: "book9", totalLoaned: 35, },
      { key: "book10", totalLoaned: 35, },
    ],
  }

  // TODO: get data from DB
  const chartCompareAddDelBook = {
    config: {
      total: {
        label: "Total"
      },
      added: {
        label: "Buku yang ditambahkan",
        color: "var(--chart-2)",
      },
      deleted: {
        label: "Buku yang dihapus",
        color: "var(--chart-2)",
      }
    },
    data: [
      { name: "added", total: 90, fill: "var(--color-chrome)" },
      { name: "deleted", total: 10, fill: "var(--color-safari)" },
    ],
  }

  return (
    <>
      <h1 className="sr-only">Dashboard Page</h1>
      <ContentHead 
        pageTitle='Dashboard'
        rightContentItem={rightContentItem}
        />
      {/* // TODO: make it responsive */}
      <section className="grid gap-5">
        <CardTotalDash 
          items={totalInfoData} 
          className=""
        />
        <CardLoanYearAllDash 
          chartConfig={chartLoanYearAllData.config} 
          chartData={chartLoanYearAllData.data} 
          className="" 
        />
        <CardTopMemberLoan
          chartConfig={chartTopMemberLoanBookExample.config}
          chartData={chartTopMemberLoanBookExample.data}
          chartXKey="totalLoan"
          chartBarKey="totalLoan"
          chartYKey="key"
        />
        <CardTopLoanedBook 
          chartConfig={chartTopLoanedBookDataExample.config}
          chartData={chartTopLoanedBookDataExample.data}
          chartXKey="totalLoaned"
          chartBarKey="totalLoaned"
          chartYKey="key"
        />
        <CardCompareAddDelBook 
          chartConfig={chartCompareAddDelBook.config}
          chartData={chartCompareAddDelBook.data}
        />
      </section>
    </>
  )
}