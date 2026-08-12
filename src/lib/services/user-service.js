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
import { USER_ROLE } from '../constants/user'
import { createArrRole } from '../models/role-model'

const isFound = async ({ id }) => {
  const [user] = await UserDAL.getById(sql, parseInt(id))
  return user !== undefined
}

const verifyRoleIsExist = (roles = [], roleId) => {
  return roles.find((item) => item.id == roleId) ? true : false
}

const UserService = {
  checkCredential: async ({ user, enteredPwd }) => {
    let isMatch = false

    if (user) {
      isMatch = await bcrypt.compare(enteredPwd, user.password)
    }

    return isMatch
  },

  getByUsername: async (username) => {
    const [user] = await UserDAL.getByUsername(sql, username)
    
    if (!user) {
      throw new NotFoundError('username', 'username is not found')
    }

    return createUserDTO(user)
  },

  getById: async (id) => {
    const [user] = await UserDAL.getById(sql, id)

    if (!user) {
      throw new NotFoundError('id', 'user id is not found')
    }

    return createUserDTO(user)
  },

  getRoles: async (id) => {
    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'user id is not found.')
    }

    const roles = await UserDAL.getRoles(sql, parseInt(id))
    return createArrRole(roles)
  },

  getRoleAsObj: async (id) => {
    const roles = await UserService.getRoles(id)
    return {
      isSuperAdmin: verifyRoleIsExist(roles, USER_ROLE.SUPER_ADMIN),
      isPustakawan: verifyRoleIsExist(roles, USER_ROLE.PUSTAKAWAN),
      isViewer: verifyRoleIsExist(roles, USER_ROLE.VIEWER)
    }
  },

  checkEmailExist: async ({ id, email }) => {
    const [user] = await UserDAL.checkEmailExist(sql, id, email)
    return user !== undefined
  },

  checkUsernameExist: async ({ id, username }) => {
    const [user] = await UserDAL.checkUsernameExist(sql, id, username)
    return user !== undefined
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

    const isEmailExist = await UserService.checkEmailExist({ id: user.id, email: user.email })
    if (isEmailExist) {
      throw new BadRequestError('email', `email is already taken.`)
    }

    const result = await sql.begin(async sql => {
      const data = { username, email, fullName, gender, address }
      const [user] = await UserDAL.updateProfile(sql, data)

      if (user === null) {
        throw new ActionFailedError(`Failed to update user profile data.`)
      }
  
      return createUserDTO(user)
    })

    return result
  },
  
  changeUsername: async ({ newUsername }) => {
    if (!newUsername || (newUsername && newUsername.trim() === '')) throw new Error('newUsername must not be null, undefined, or empty')

    const session = await SessionDAL.verify()
    if (!session.isAuth) {
      throw new UnauthorizeError('User is not authenticated')
    }

    const user = await UserService.getById(session.userId)
    if (user.username === newUsername) {
      throw new BadRequestError('newUsername', 'newUsername must not be same with prev username')
    }

    const result = await sql.begin(async sql => {
      const [data] = await UserDAL.changeUsername(sql, user.id, newUsername)
      if (!data) {
        throw new ActionFailedError('Failed to change username for user id: ' + user.id)
      }
  
      return createUserDTO(data)
    })

    return result
  }, 
}


export default UserService