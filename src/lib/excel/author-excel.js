import 'server-only'

import  ExcelJS  from 'exceljs'

const createWorkbook = ({ authors }) => {
  const workbook = new ExcelJS.Workbook();

  workbook.created = new Date();
  workbook.views = [
    {
      x: 0, y: 0, width: 5000, height: 10000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]

  const worksheet = workbook.addWorksheet('Pengarang sheet', {
    pageSetup: {paperSize: 9}
  })
  
  worksheet.columns = [
    { header: 'Nama Lengkap', key: 'fullName', width: 20 },
    { header: 'Kebangsaan', key: 'countryName', width: 15 },
    { header: 'Aktif Sejak', key: 'activeSince', width: 15 },
    { header: 'Tentang', key: 'about', width: 40},
    { header: 'Tanggal Dibuat', key: 'createdAt', width: 15},
    { header: 'Tanggal Diperbaharui', key: 'updatedAt', width: 25},
  ]

  worksheet.addRows(authors)

  return workbook
}

const generateAuthorExcel = async ({ authors }) => {
  if (
    authors === undefined || 
    authors === null
  ) {
    throw new Error(`authors data must not be 'null' or 'undefined'.`)
  }

  const workbook = createWorkbook({ authors })
  return await workbook.xlsx.writeBuffer();
}

export {
  generateAuthorExcel
}