import {NextResponse} from "next/server";
import {client} from "@/app/lib/elasticsearch";
import { cookies } from 'next/headers'
export async function GET(request, {params}) {

  const article = (await params).article

  const response = await client.get({
    index: 'articles',
    id: article
  })

  return NextResponse.json({
    ...response._source,
  })
}