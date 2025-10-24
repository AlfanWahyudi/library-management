import { extSchema } from "@/lib/schemas/file-schema"
import { NextResponse } from "next/server"
import AuthorService from "@/lib/services/author-service"
import { ZodError } from "zod"
import { createErrorRes } from "@/lib/dto/res-dto"

export async function GET(req) {
  try {
    const url = req.nextUrl
    const params = url.searchParams

    const ext = params.get('extension')
    const parsedExt = extSchema.xlsx.parse(ext)

    const buffer = await AuthorService.exportToExcel()
    const fileName = `authors_${new Date().toISOString()}.${parsedExt}`

    return new NextResponse(buffer, {
      status: 200,
      statusText: `Successfully download authors data ${parsedExt} version.`,
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