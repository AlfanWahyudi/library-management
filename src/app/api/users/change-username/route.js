import { createSuccessRes } from "@/lib/dto/res-dto"
import UserService from "@/lib/services/user-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"

export async function PUT(req) {
  try {
    const body = await req.json()

    let newUsername = body.newUsername || ''
    newUsername = newUsername.trim()
    if (!newUsername) {
      throw new Error('newUsername must not be empty')
    }

    const data = await UserService.changeUsername({ newUsername })

    return NextResponse.json(
      createSuccessRes({
        message: 'Username successfully changed.',
        data
      })
    )

  } catch (err) {
    console.error(err)
    
    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
  }
}