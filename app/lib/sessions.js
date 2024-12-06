import "server-only"
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const encrypt = async (payload)=>{
  return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export const decrypt = async (session)=>{
  try {
    const {payload} = await jwtVerify(session, encodedKey,{
      algorithms: ['HS256'],
    })
    return payload
  } catch (e) {
    console.log('Failed to verify session')
  }
}

export const createSession = async (userId)=>{
  const expiresAt = new Date(Date.now() * 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({userId, expiresAt})
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)(
      await cookies()
  ).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}