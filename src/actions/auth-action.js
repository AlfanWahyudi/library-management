'use server'

import { loginSchema } from '@/schemas/login-schema'
import { redirect } from 'next/navigation'

export async function login(prevState, formData) {
  console.log(formData)
  console.log(prevState)

  const data = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  const validateFields = loginSchema.safeParse(data)

  //TODO: samakan object pada returnya untuk pesan error dan engga nya
  if (!validateFields.success) {
    return validateFields.error
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