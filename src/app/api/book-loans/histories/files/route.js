import { fileExtSchema } from "@/lib/schemas/file/file-ext-schema"
import { NextResponse } from "next/server"
import { generateErrorHttpRes } from "@/lib/utils/http"
import BookLoanService from "@/lib/services/book-loan-service"
import BookLoanRouteAuth from "@/lib/auth/route/book-loan-route-auth"

export async function GET(req) {
  try {
    await BookLoanRouteAuth.verifyCanExportExcelListAll()

    const url = req.nextUrl
    const params = url.searchParams

    const ext = params.get('extension')
    const parsedExt = fileExtSchema.xlsx.parse(ext)

    const buffer = await BookLoanService.exportHistToExcel()
    const fileName = `book_loan_histories_${new Date().toISOString()}.${parsedExt}`

    return new NextResponse(buffer, {
      status: 200,
      statusText: `Successfully download book loan histories data ${parsedExt} version.`,
      headers: new Headers({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`
      })
    });
  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
} 