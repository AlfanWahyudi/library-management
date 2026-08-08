import { decrypt } from "@/lib/utils/server/session"
import { cookies } from "next/headers"
import { cache } from "react"
import { COOKIE } from "../constants/cookie"

const SessionDAL = {
  verify: cache(async () => {
    let result = {
      isAuth: false
    }

    const cookie = (await cookies()).get(COOKIE.SESSION.name)?.value
    if (!cookie) {
      console.log("session in cookie is not found")
      return result
    }

    const session = await decrypt(cookie)
    if (session?.userId) {
      result.isAuth = true

      result = { ...result, ...session }
    }
    return result
  })
}


export default SessionDAL