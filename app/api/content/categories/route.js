import {NextResponse} from "next/server"
import {client} from "@/app/lib/elasticsearch"
import { cookies } from 'next/headers'

export async function GET(request) {


  const sp = request.nextUrl.searchParams

  const result = await client.search({
    index: 'categories',
    query: {
      bool: {
        must: [
          { match: { "language": sp.get('locale') } }
        ]
      }
    },
    size: 50
  })

  return NextResponse.json({
    categories: result.hits.hits.map(category => ({
      id: category._source.category_id,
      name: category._source.name,
      slug: category._source.slug,
      in_menu: category._source.in_menu,
    }))
  })
}