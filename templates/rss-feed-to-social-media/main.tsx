import { serve } from 'netzo/mod.ts'
// import * as facebook from "./facebook.ts"
// import * as instagram from "./instagramm.ts"
// import * as linkedin from "./linkedin.ts"
// import * as medium from "./medium.ts"
// import * as twitter from "./twitter.ts"

async function handler(_req: Request) {
  const response = await fetch(
    'https://netzo.io/feed.json',
  )
  const body = await response.json()
  const lastPost = body.items[0]
  // const mediumDetails = await medium.getUserDetails()
  // const mediumPublications = await medium.getUserPublications()
  // const mediumPost = await medium.newPostToMedium(lastPost)
  // const linkedinPost = await linkedin.newPostToLinkedIn()
  return new Response(JSON.stringify(lastPost, null, 2), {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
  })
}

serve({ '*': handler })
