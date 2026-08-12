import { fileExtSchema } from "@/lib/schemas/file/file-ext-schema"
import { NextResponse } from "next/server"
import { generateErrorHttpRes } from "@/lib/utils/http"
import MemberService from "@/lib/services/member-service"
import MemberRouteAuth from "@/lib/auth/route/member-route-auth"

export async function GET(req) {
  try {
    await MemberRouteAuth.verifyCanExportExcelListAll()

    const url = req.nextUrl
    const params = url.searchParams

    const ext = params.get('extension')
    const parsedExt = fileExtSchema.xlsx.parse(ext)

    const buffer = await MemberService.exportToExcel()
    const fileName = `members_${new Date().toISOString()}.${parsedExt}`

    return new NextResponse(buffer, {
      status: 200,
      statusText: `Successfully download members data ${parsedExt} version.`,
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