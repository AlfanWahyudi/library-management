import 'server-only'

import  ExcelJS  from 'exceljs'

const createWorkbook = ({ bookLoanHist }) => {
  const workbook = new ExcelJS.Workbook();

  workbook.created = new Date();
  workbook.views = [
    {
      x: 0, y: 0, width: 5000, height: 10000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]

  const worksheet = workbook.addWorksheet('Histories Sheet', {
    pageSetup: {paperSize: 9}
  })
  
  worksheet.columns = [
    { header: 'Anggota', key: 'memberFullName', width: 25 },
    { header: 'Email Anggota', key: 'memberEmail', width: 25 },
    { header: 'Judul Buku', key: 'bookTitle', width: 25},
    { header: 'ISBN', key: 'bookIsbn', width: 25 },
    { header: 'Tanggal Mulai', key: 'startDate', width: 25},
    { header: 'Tanggal Selesai', key: 'endDate', width: 25},
    { header: 'Tanggal Pengembalian', key: 'finishedDate', width: 25},
  ]

  worksheet.addRows(bookLoanHist)

  return workbook
}

const generateBookLoanHistExcel = async ({ bookLoanHist }) => {
  if (
    bookLoanHist === undefined || 
    bookLoanHist === null
  ) {
    throw new Error(`book loan histories data must not be 'null' or 'undefined'.`)
  }

  const workbook = createWorkbook({ bookLoanHist })
  return await workbook.xlsx.writeBuffer();
}

export {
  generateBookLoanHistExcel
}