import { Netzo } from 'netzo/mod.ts'

const {
  NETZO_API_KEY,
  MEDIUM_INTEGRATION_TOKEN,
} = Deno.env.toObject()

const mediumUserId =
  '146350f74b67428f12a258bde8c8a62d0a5bc272dfa363ca7e0a756486611234e'
const mediumPublicationId = ''

const netzo = Netzo({ apiKey: Deno.env.get(NETZO_API_KEY) })
const medium = netzo.http({
  baseURL: `https://api.medium.com/v1`,
  headers: {
    'Authorization': `Bearer ${MEDIUM_INTEGRATION_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

// GET https://api.medium.com/v1/me
export async function getUserDetails() {
  const response = await medium.me.get()
  const userDetails = await response.json
  console.log(`[medium] Successfully retrieved account details`)
  console.log(userDetails)
  return new Response(JSON.stringify(userDetails, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}

// GET https://api.medium.com/v1/users/{{userId}}/publications
export async function getUserPublications() {
  const response = await medium.users[`${mediumUserId}`].publications.get()
  const userPublications = await response.json
  console.log(`[medium] Successfully retrieved user publications`)
  console.log(userPublications)
  return new Response(JSON.stringify(userPublications, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}

// GET https://api.medium.com/v1/publications/{{publicationId}}/contributors
export async function getPublicationContributors() {
  const response = await medium.publications[`${mediumPublicationId}`]
    .contributors.get()
  const userPublications = await response.json
  console.log(`[medium] Successfully retrieved user publications`)
  console.log(userPublications)
  return new Response(JSON.stringify(userPublications, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}

// POST https://api.medium.com/v1/users/{{authorId}}/posts
export async function newPostToMedium(post: any) {
  const response = await medium.users[`${mediumUserId}`].posts.post({
    title: post.title,
    contentFormat: 'markdown',
    content:
      `![${post.title}](${post.image})\n\n # ${post.title}\n\n\n\n ### ${post.summary} \n\n ${post.content_html}`,
    canonicalUrl: post.url,
    tags: post.tags,
    publishStatus: 'draft', // always "draft" fot testing, else "public"
    notifyFollowers: true,
  })
  const newPost = await response.json
  console.log(`[medium] Successfully posted new entry: ${post.title}`)
  return new Response(JSON.stringify(newPost, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}

// POST https://api.medium.com/v1/publications/{{publicationId}}/posts
export async function newPostUnderPublicationToMedium(post: any) {
  const response = await medium.publications[`${mediumPublicationId}`].posts
    .post({
      title: post.title,
      contentFormat: 'markdown',
      content:
        `![](https://netzo.io/images/home/all-in-one-orchestration-solution-light.png) ${post.content_html}`,
      canonicalUrl: post.url,
      tags: [],
      publishStatus: 'draft', // always "draft" fot testing, else "public"
      notifyFollowers: true,
    })
  const newPostUnderPublication = await response.json
  console.log(
    `[medium] Successfully posted new entry under publication: ${post.title}`,
  )
  return new Response(JSON.stringify(newPostUnderPublication, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}
