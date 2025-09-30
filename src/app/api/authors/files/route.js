import AuthorViewDAL from "@/lib/dal/dbview/author-view-dal"
import { exportFileSchema } from "@/lib/schemas/export-file-schema"
import { NextResponse } from "next/server"
import  ExcelJS  from 'exceljs'

//TODO: Cleaning code nya
//TODO: optimize code untuk write and download nya, agar load banyak data tidak lemot
export async function GET(req) {
  try {
    
    const url = req.nextUrl
    const params = url.searchParams
  
    //TODO: FIX redundant validation untuk cek extension, validate sekali saja, karena yang akan dibuat sekarang hanya untuk XLSX ext saja
    const extension = params.get('extension')
    const parsed = exportFileSchema.parse({ extension })
  
    // Validate only xlsx is supported for downloading authors data
    if (parsed.extension !== 'xlsx') {
      return NextResponse.json({}, { status: 400 })
    }
  
    // Write Excel file
    const authors = await AuthorViewDAL.getAllForExcel()
  
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
    ];

    worksheet.addRows(authors)
  
    const buffer = await workbook.xlsx.writeBuffer();

    const fileName = `authors_${new Date().toISOString()}.xlsx`

    return new NextResponse(buffer, {
      status: 200,
      statusText: 'Successfully download authors data xlsx version.',
      headers: new Headers({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`
      })
    });
  } catch (err) {
    console.error(err)
    
    if (err instanceof ZodError) {
      return NextResponse.json(
        createErrorRes({
          error: 'Validation failed.',
          details: err.issues
        }),
        { status: 400 }
      )
    }

    return NextResponse.json(
      createErrorRes({
        error: err.toString(),
      }),
      { status: 500 }
    )
  }
} 