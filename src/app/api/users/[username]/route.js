import { createSuccessRes } from "@/lib/dto/res-dto"
import { userServerSchema } from "@/lib/schemas/auth/user-server-schema"
import UserService from "@/lib/services/user-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { checkUserAlreadyLoggedIn } from "@/lib/utils/server/auth"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    await checkUserAlreadyLoggedIn()

    const { username } = await params
    const body = await req.json()
    const parsed = userServerSchema.parse(body)

    const data = await UserService.updateProfile({username, ...parsed})

    return NextResponse.json(
      createSuccessRes({
        message: 'User successfully updated, username: ' + username,
        data
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}