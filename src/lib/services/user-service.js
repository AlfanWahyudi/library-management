import 'server-only'

import bcrypt from 'bcrypt'
import UserDAL from '../dal/user-dal'
import SessionDAL from '../dal/session-dal'
import { createUserDTO } from '../dto/user-dto'

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
  },

  updateProfile: async ({ username, email, fullName, gender, address }) => {
    if (username === null || username === '') throw new Error('username must not be null or empty')

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new Error('User is not authenticated')
    }

    const user = await UserService.getById(session.userId)
    if (user.username !== username) {
      throw new Error(`You don't have any permission to update this user data.`)
    }

    const isEmailExist = await UserDAL.checkEmailExist({ id: user.id, email: user.email })
    if (isEmailExist) {
      throw new Error(`email is already taken.`)
    }

    const data = await UserDAL.updateProfile({ username, email, fullName, gender, address })

    if (data === null) {
      throw new Error(`Failed to update user profile data.`)
    }

    return createUserDTO(data)
  }
}


export default UserService