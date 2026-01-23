import 'server-only'

import sql from '../config/db'
import bcrypt from 'bcrypt'
import UserDAL from '../dal/user-dal'
import SessionDAL from '../dal/session-dal'
import { createUserDTO } from '../dto/user-dto'
import { NotFoundError } from '../errors/not-found-error'
import { BadRequestError } from '../errors/bad-request-error'
import { UnauthorizeError } from '../errors/unauthorized-error'
import { ForbiddenError } from '../errors/forbidden-error'
import { ActionFailedError } from '../errors/action-failed-error'

const UserService = {
  checkCredential: async ({ user, password }) => {
    let isMatch = false

    if (user) {
      isMatch = await bcrypt.compare(password, user.password)
    }

    return isMatch
  },

  getById: async (id) => {
    const user = await UserDAL.getById(sql, id)

    if (user == null) {
      throw new NotFoundError('id', 'user id is not found')
    }

    return user
  },

  checkEmailExist: async ({ id, email }) => {
    const user = await UserDAL.checkEmailExist(sql, id, email)
    return user !== null
  },

  checkUsernameExist: async ({ id, username }) => {
    const user =  await UserDAL.checkUsernameExist(sql, id, username)
    return user !== null
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

    const isEmailExist = await UserDAL.checkEmailExist(sql, user.id, user.email)
    if (isEmailExist) {
      throw new BadRequestError('email', `email is already taken.`)
    }

    const updatedUser = await sql.begin(async sql => {
      const data = { username, email, fullName, gender, address }
      const [updatedUser] = await UserDAL.updateProfile(sql, data)

      return updatedUser
    })

    if (updatedUser === null) {
      throw new ActionFailedError(`Failed to update user profile data.`)
    }

    return createUserDTO(updatedUser)
  },

  changeUsername: async ({ newUsername }) => {
    if (!newUsername || (newUsername && newUsername.trim() === '')) throw new Error('newUsername must not be null, undefined, or empty')

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new UnauthorizeError('User is not authenticated')
    }

    const user = await UserDAL.getById(sql, session.userId)
    if (user.username === newUsername) {
      throw new BadRequestError('newUsername', 'newUsername must not be same with prev username')
    }

    const data = await sql.begin(async sql => {
      const [data] = await UserDAL.changeUsername(sql, user.id, newUsername)

      return data
    })

    if (!data) {
      throw new ActionFailedError('Failed to change username for user id: ' + user.id)
    }

    return createUserDTO(data)
  }, 
}


export default UserService