import 'server-only'

import bcrypt from 'bcrypt'

const UserService = {
  checkCredential: async ({ user, password }) => {
    let isMatch = false

    if (user) {
      isMatch = await bcrypt.compare(password, user.password)
    }

    return isMatch
  }
}


export default UserService