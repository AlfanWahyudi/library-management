import SessionDAL from "@/lib/dal/session-dal"
import { createSuccessRes } from "@/lib/dto/res-dto"
import MemberService from "@/lib/services/member-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

const fields = ['email', 'phone']

export async function GET(req) {
  try {
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

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new Error('User is not authenticated.')
    }

    const isExist = await MemberService.isDataExist(query)
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