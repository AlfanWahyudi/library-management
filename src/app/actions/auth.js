'use server'

import { loginSchema } from '@/lib/schemas/auth/login-schema'
import { redirect } from 'next/navigation'
import z from 'zod'
import { createSession } from '@/lib/utils/server/session'
import { cookies } from 'next/headers'
import UserDAL from '@/lib/dal/user-dal'
import UserService from '@/lib/services/user-service'


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

  const user = await UserDAL.getByUsername(fd.username)

  const isMatch = await UserService.checkCredential({ user: user, password: fd.password })
  if (!isMatch) {
    error.form = 'Username/Password salah.'
    return error
  }

  const roles = await UserDAL.getRoles({ id: user.id })

  await createSession({
    userId: user.id,
    fullName: user.full_name,
    roles,
  })

  redirect('/dashboard')
}

export async function logout() {
  (await cookies()).delete('session')
  
  redirect('/login')
}