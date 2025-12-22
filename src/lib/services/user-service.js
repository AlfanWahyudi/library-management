import 'server-only'

import bcrypt from 'bcrypt'
import UserDAL from '../dal/user-dal'
import SessionDAL from '../dal/session-dal'
import { createUserDTO } from '../dto/user-dto'
import { NotFoundError } from '../errors/not-found-error'
import { BadRequestError } from '../errors/bad-request-error'
import { UnauthorizeError } from '../errors/unauthorized-error'
import { ForbiddenError } from '../errors/forbidden-error'

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
      throw new NotFoundError('id', 'user id is not found')
    }

    return user
  },

  checkEmailExist: async ({ id, email }) => {
    return await UserDAL.checkEmailExist({ id, email })
  },

  checkUsernameExist: async ({ id, username }) => {
    return await UserDAL.checkUsernameExist({ id, username })
  },

  updateProfile: async ({ username, email, fullName, gender, address }) => {
    if (username === null || username === '') throw new BadRequestError('username', 'username must not be null or empty')

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new UnauthorizeError('User is not authenticated')
    }

    const user = await UserService.getById(session.userId)
    if (user.username !== username) {
      throw new ForbiddenError(`You don't have any permission to update this user data.`)
    }

    const isEmailExist = await UserDAL.checkEmailExist({ id: user.id, email: user.email })
    if (isEmailExist) {
      throw new BadRequestError('email', `email is already taken.`)
    }

    const data = await UserDAL.updateProfile({ username, email, fullName, gender, address })

    if (data === null) {
      throw new Error(`Failed to update user profile data.`)
    }

    return createUserDTO(data)
  },

  changeUsername: async ({ newUsername }) => {
    if (!newUsername || (newUsername && newUsername.trim() === '')) throw new Error('newUsername must not be null, undefined, or empty')

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new UnauthorizeError('User is not authenticated')
    }

    const user = await UserDAL.getById(session.userId)
    if (user.username === newUsername) {
      throw new BadRequestError('newUsername', 'newUsername must not be same with prev username')
    }

    const data = await UserDAL.changeUsername({ id: user.id, newUsername })

    if (!data) {
      throw new Error('Failed to change username for user id: ' + user.id)
    }

    return createUserDTO(data)
  }, 
}


export default UserService