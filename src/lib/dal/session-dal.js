import { decrypt } from "@/lib/utils/session"
import { cookies } from "next/headers"
import { cache } from "react"

const SessionDAL = {
  verify: cache(async () => {
    let result = {
      isAuth: false
    }

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    if (session?.userId) {
      result.isAuth = true

      result = { ...result, ...session }
    }
    return result
  })
}


export default SessionDAL