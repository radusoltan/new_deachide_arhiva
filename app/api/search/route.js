import {NextResponse} from "next/server";
import {client} from "@/app/lib/elasticsearch";

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page"))
  const size = Number(searchParams.get("size"))
  const q = searchParams.get("q")

  const from = (page -1) * size;

  const response = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          { match: { "language": "ro" } },
          { multi_match: {
            query: q,
            fields: ["title^5", "lead","content"]
          }}
        ]
      }
    },
    from,
    size,
    sort: [
      { 'published_at': { "order": "desc", format: "strict_date_optional_time_nanos" } },
    ]
  })

  return NextResponse.json({
    results: response.hits.hits,
    total: response.hits.total.value,
  })
}