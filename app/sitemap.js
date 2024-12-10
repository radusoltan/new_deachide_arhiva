import {client} from "@/app/lib/elasticsearch";


const sitemap = async ()=>{

  const roItems = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          { match: {"language": "ro"} }
        ]
      }
    },
    // size: 200000
  })
  const items = roItems.hits.hits.map(item=>({
    url: `${process.env.APP_URL}${item._source.language}/${item._source.category.slug}/${item._id}/${item._source.slug}`,
    lastModified: new Date(item._source.published_at),
  }))
  console.log(items);

  return [
    {
      url: process.env.APP_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
      alternates: {
        languages: {
          ru: process.env.APP_URL + 'ru',
          en: process.env.APP_URL + 'en',
        }
      }
    },
      ...roItems.hits.hits.map(item=>({
      url: `${process.env.APP_URL}${item._source.language}/${item._source.category.slug}/${item._id}/${item._source.slug}`,
      lastModified: new Date(item._source.published_at),
    }))
  ]
}
export default sitemap