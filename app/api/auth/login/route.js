import {NextResponse} from "next/server";
import {client} from "@/app/lib/elasticsearch";
import {comparePassword} from "@/app/utils/hash";
import jwt from "jsonwebtoken";
import {createSession} from "@/app/lib/sessions";

const JWT_SECRET = process.env.SESSION_SECRET

export const POST = async (request)=>{

  const { email, password } = await request.json();

  const response = await client.search({
    index: "users",
    query: {
      term: {email}
    }
  })
  let user
  if(response.hits.total.value > 0){
    user = response.hits.hits[0]
  }

  const passwordMatch = await comparePassword(password, user._source.password)
  if(!passwordMatch){
    return NextResponse.json(
        {error: "Incorrect password"},
        {status: 401}
    )
  }
  await createSession(user._id)
  const token = jwt.sign(
      {
        id: user._id,
        username: user._source.username,
        email: user._source.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h"
      }
  )


  return NextResponse.json({
    user_id: user._id,
    username: user._source.username,
    email: user._source.email,
    token: token,
  })
}