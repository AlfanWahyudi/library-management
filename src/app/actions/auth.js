'use server'

import { loginSchema } from '@/lib/schemas/auth/login-schema'
import { redirect } from 'next/navigation'
import z from 'zod'
import { createSession } from '@/lib/utils/server/session'
import { cookies } from 'next/headers'
import UserDAL from '@/lib/dal/user-dal'
import UserService from '@/lib/services/user-service'
import sql from '@/lib/config/db'
import { ROUTE } from '@/lib/constants/route'
import { COOKIE } from '@/lib/constants/cookie'

const defaultErrMsg = 'Username/Password salah.'

export async function login(prevState, formData) {
  const error = {
    form: null,
    username: [],
    password: []
  }

  const fd = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  const validatedFields = loginSchema.safeParse(fd)
  if (!validatedFields.success) {
    const flattenError = z.flattenError(validatedFields.error)

    error.form.push(...flattenError.formErrors)
    error.username.push(...flattenError.fieldErrors.username) 
    error.password.push(...flattenError.fieldErrors.password) 

    return error
  }

  const [user] = await UserDAL.getByUsername(sql, fd.username)
  if (!user) {
    error.form = defaultErrMsg
    return error
  }

  const isMatch = await UserService.checkCredential({ user: user, enteredPwd: fd.password })
  if (!isMatch) {
    error.form = defaultErrMsg
    return error
  }

  const roles = await UserDAL.getRoles(sql, user.id)

  await createSession({
    userId: user.id,
    fullName: user.fullName,
    roles,
  })

  redirect(ROUTE.DASHBOARD.url)
}

export async function logout() {
  (await cookies()).delete(COOKIE.SESSION.name)
  
  redirect(ROUTE.LOGIN.url)
}