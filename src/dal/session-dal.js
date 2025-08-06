import { decrypt } from "@/lib/session"
import { cookies } from "next/headers"
import { cache } from "react"

const SessionDAL = {
  verify: cache(async () => {
    const result = {
      isAuth: false
    }

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    if (session?.userId) {
      result.isAuth = true
      result.userId = session.userId 
      result.fullName = session.fullName 
      result.role = {
        name: session.roleName,
        code: session.roleCode,
      }
    }

    return result
  })
}


export default SessionDAL