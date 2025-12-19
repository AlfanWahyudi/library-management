import { createSuccessRes } from "@/lib/dto/res-dto"
import { memberServerSchema } from "@/lib/schemas/member-server-schema"
import MemberService from "@/lib/services/member-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"


export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = memberServerSchema.parse(body)

    const member = await MemberService.save({ id: parseInt(id), ...parsed })

    return NextResponse.json(
      createSuccessRes({
        message: 'member successfully updated, id: ' + id,
        data: member
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}