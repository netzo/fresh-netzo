import { json, serve } from 'netzo/mod.ts'
import { generateSocialMediaPosts } from './workflows/post-generator/openai.ts'
import { PageContact } from './workflows/post-generator/pages.tsx'

// import { getDetailsFromWebsite } from "./workflows/website-parser.ts"

const projectURL = `https://${Deno.env.get('DENO_DEPLOYMENT_ID')}.netzo.io`

async function formHandler(req: Request, _connInfo, params): Promise<Response> {
  switch (req.method) {
    case 'GET': {
      return jsx(<PageContact url={projectURL} />)
    }
  }
}

async function openAiHandler(
  req: Request,
  _connInfo,
  params,
): Promise<Response> {
  switch (req.method) {
    case 'GET': {
      const result = await generateSocialMediaPosts()
      const instagramPost = result.instagram.choices[0].text
      const linkedinPost = result.linkedin.choices[0].text
      const twitterPost = result.twitter.choices[0].text
      const youtubePost = result.youtube.choices[0].text
      const facebookPost = result.facebook.choices[0].text
      // const resultImages = await generateSocialMediaImage(twitterPost)

      return json({
        instagramPost,
        linkedinPost,
        twitterPost,
        youtubePost,
        facebookPost,
      })
    }
    case 'POST': {
      const eventData = await req.json()
      console.log(eventData)
      const campaign = eventData
      const result = await generateSocialMediaPosts(campaign)
      const instagramPost = result.instagram.choices[0].text
      const linkedinPost = result.linkedin.choices[0].text
      const twitterPost = result.twitter.choices[0].text
      const youtubePost = result.youtube.choices[0].text
      const facebookPost = result.facebook.choices[0].text
      // const resultImages = await generateSocialMediaImage(campaign)

      return json({
        instagramPost,
        linkedinPost,
        twitterPost,
        youtubePost,
        facebookPost,
      })
    }

    default:
      return new Response('Invalid method', { status: 405 })
  }
}

async function openAiHandler2(
  req: Request,
  _connInfo,
  params,
): Promise<Response> {
  const response = await getDetailsFromWebsite('https://netzo.io')
  return json(response)
}

serve({
  '/ui': formHandler,
  '/': openAiHandler,
  '/2': openAiHandler2,
  404: () => new Response('not found', { status: 405 }),
})
