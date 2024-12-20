import 'server-only'
import {cookies} from "next/headers"
import {decrypt} from "@/app/lib/sessions"
import {cache} from 'react'
import {redirect} from "next/navigation";
import {client} from "@/app/lib/elasticsearch";

export const verifySession = cache(async ()=>{
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session.userId){
    redirect('/login')
  }
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async ()=>{
  const session = await verifySession()
  if (!session) return null

  try {
    const data = await client.get({
      index: 'users',
      id: session.userId
    })
    return data._source
  } catch (error) {

  }

})