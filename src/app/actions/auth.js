'use server'

import sql from '@/db'
import { loginSchema } from '@/schemas/login-schema'
import { redirect } from 'next/navigation'
import z from 'zod'
import bcrypt from 'bcrypt'
import { createSession } from '@/lib/session'
import { cookies } from 'next/headers'


//TODO: business logic nya pindahin ke service class
export async function login(prevState, formData) {
  const error = {
    form: [],
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

  const data = await sql`
    select 
      * 
    from users
    where username = ${fd.username}
  `

  if (data.length === 0) {
    error.form.push('Username/Password salah.')
    return error
  }

  const user = data[0]

  const match = await bcrypt.compare(fd.password, user.password)
  if (!match) {
    error.form.push('Username/Password salah.')
    return error
  }

  const userRole = await sql`
    select *
    from user_roles ur 
    join roles r 
    on ur.role_code = r.code 
    where ur.user_id  = ${user.id}
  `

  await createSession({
    userId: user.id,
    fullName: user.full_name,
    roleCode: userRole[0].role_code,
    roleName: userRole[0].name
  })

  redirect('/dashboard')
}

export async function logout() {
  (await cookies()).delete('session')
  
  redirect('/login')
}