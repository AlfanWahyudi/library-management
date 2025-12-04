import SessionDAL from "@/lib/dal/session-dal"
import { createSuccessRes } from "@/lib/dto/res-dto"
import UserService from "@/lib/services/user-service"
import { generateErrorHttpRes } from "@/lib/utils/http"
import { NextResponse } from "next/server"


//TODO: test for check duplication of username
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams

    const query = {
      email: searchParams.get('email') || null,
      username: searchParams.get('username') || null,
    }

    if (!query.email && !query.username) {
      throw new Error(`Both params (email or username) cannot be empty or null. Choose wether to find duplicate data.`)
    } else if (query.email && query.username) {
      throw new Error(`Cannot find by two params. Choose only one (email or username) to find the duplicate data.`)
    }

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new Error('User is not authenticated.')
    }

    let message = ''
    let data = null
    if (query.email) {
      message = `Successfully check duplication of email for userId: ${session.userId}`

      const isEmailExist = await UserService.checkEmailExist({ id: session.userId, email: query.email })
      data = {
        isEmailExist
      }
    }

    // if (query.username) {
    //   message = `Successfully check duplication of username for userId: ${session.userId}`

    //   const isUsernameExist = await UserService.checkUsernameExist({ id: session.userId, username: query.username })
    //   data = {
    //     isUsernameExist
    //   }
    // }

    return NextResponse.json(
      createSuccessRes({
        message,
        data
      })
    )

  } catch (err) {
    console.error(err)

    const httpErr = generateErrorHttpRes(err)
    return NextResponse.json(httpErr.errRes, { status: httpErr.status })
    
  }
}