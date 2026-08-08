import { createSuccessRes } from "@/lib/dto/res-dto"
import { memberServerSchema } from "@/lib/schemas/member/member-server-schema"
import MemberService from "@/lib/services/member-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"


export async function PUT(req, { params }) {
  try {
    await checkUserAlreadyLoggedIn()

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