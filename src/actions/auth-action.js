'use server'

import { loginSchema } from '@/schemas/login-schema'
import { redirect } from 'next/navigation'
import z from 'zod'

export async function login(prevState, formData) {
  const data = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  const validatedFields = loginSchema.safeParse(data)
  if (!validatedFields.success) {
    return z.flattenError(validatedFields.error)
  }

  //TODO: validate username and password on db
  // if exist / correct login get user data and set the session

  redirect('/dashboard')
}

export async function logout() {
  // check user first, is already logged in or not
  // remove session
  // redirect to login page
  
  return null
}