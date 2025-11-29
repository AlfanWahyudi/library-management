import 'server-only'

import bcrypt from 'bcrypt'
import UserDAL from '../dal/user-dal'

const UserService = {
  checkCredential: async ({ user, password }) => {
    let isMatch = false

    if (user) {
      isMatch = await bcrypt.compare(password, user.password)
    }

    return isMatch
  },

  getById: async (id) => {
    const user = await UserDAL.getById(id)

    if (user == null) {
      throw new Error('user id is not found')
    }

    return user
  }
}


export default UserService