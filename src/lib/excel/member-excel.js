import 'server-only'

import  ExcelJS  from 'exceljs'

const createWorkbook = ({ members }) => {
  const workbook = new ExcelJS.Workbook();

  workbook.created = new Date();
  workbook.views = [
    {
      x: 0, y: 0, width: 5000, height: 10000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]

  const worksheet = workbook.addWorksheet('Member sheet', {
    pageSetup: {paperSize: 9}
  })
  
  worksheet.columns = [
    { header: 'Nama Lengkap', key: 'fullName', width: 25 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Jenis Kelamin', key: 'gender', width: 20},
    { header: 'Telepon', key: 'phone', width: 20 },
    { header: 'Alamat', key: 'address', width: 40},
    { header: 'Tanggal Lahir', key: 'birthDate', width: 20},
  ]

  worksheet.addRows(members)

  return workbook
}

const generateMemberExcel = async ({ members }) => {
  if (
    members === undefined || 
    members === null
  ) {
    throw new Error(`members data must not be 'null' or 'undefined'.`)
  }

  const workbook = createWorkbook({ members })
  return await workbook.xlsx.writeBuffer();
}

export {
  generateMemberExcel
}