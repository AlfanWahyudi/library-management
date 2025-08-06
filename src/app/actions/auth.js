'use server'

import { loginSchema } from '@/schemas/login-schema'
import { redirect } from 'next/navigation'
import z from 'zod'
import { createSession } from '@/lib/session'
import { cookies } from 'next/headers'
import UserDAL from '@/dal/user-dal'
import UserRoleDAL from '@/dal/user-role-dal'
import UserService from '@/services/user-service'


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

  const userRole = await UserRoleDAL.getById({ userId: user.id })

  await createSession({
    userId: user.id,
    fullName: user.full_name,
    roleCode: userRole[0]?.role.code,
    roleName: userRole[0]?.role.name
  })

  redirect('/dashboard')
}

export async function logout() {
  (await cookies()).delete('session')
  
  redirect('/login')
}