import 'server-only'

import AuthorDAL from "@/dal/author-dal"
import Permission from "@/lib/permission"

const resourceCode = 'AUT'

const AuthorService = {
  getById: async ({id}) => {
    const permission = await Permission.verify({
      resourceCode,
      operationCode: 'GET'
    })

    if (!permission.success) throw new Error(permission.message)

    return await AuthorDAL.getById({id})
  },
  
  getAll: async () => {
    const permission = await Permission.verify({
      resourceCode,
      operationCode: 'GET'
    })

    if (!permission.success) throw new Error(permission.message)

    return await AuthorDAL.getAll()
  },
}

export default AuthorService  