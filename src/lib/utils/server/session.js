import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const alg = 'HS256'
const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000

/*
  cara encrypt nya dengan symmetric secret
*/
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

/*
  cara decrypt nya dengan symmetric secret
*/
export async function decrypt(session) {
  try {
    const { payload, protectedHeader } = await jwtVerify(session, encodedKey, {
      algorithms: [alg],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    // throw new Error('Failed to verify session')
  }
}

export async function createSession({ userId, fullName, roles }) {
  const expiresAt = new Date(Date.now() + sevenDaysInMilliseconds)
  const session = await encrypt({ userId, fullName, roles, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: false, // change to true for prod env
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + sevenDaysInMilliseconds)(
    await cookies()
  ).set('session', session, {
    httpOnly: true,
    secure: true, // change to true for prod env
    expires: expires,
    sameSite: 'lax',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}