import BookRouteAuth from "@/lib/auth/route/book-route-auth"
import { createSuccessRes } from "@/lib/dto/res-dto"
import BookService from "@/lib/services/book-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

const fields = ['isbn']

export async function GET(req) {
  try {
    await BookRouteAuth.verifyCanFindDup()

    const searchParams = req.nextUrl.searchParams

    const query = {
      id: searchParams.get('id') ? parseInt(searchParams.get('id')) : null,
      field: searchParams.get('field') || null,
      value: searchParams.get('value') || null
    }

    if (!query.field || !query.value) {
      throw new Error('field and value must not be empty')
    } 

    const found = fields.find((field) => field === query.field)
    if (!found) {
      throw new Error(`fields must be only ${fields.toString()}`)
    }

    const isExist = await BookService.isDataExist(query)
    return NextResponse.json(
      createSuccessRes({
        message: `Successfully check duplication of ${query.field}`,
        data: {
          [query.field]: isExist
        }
      })
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}