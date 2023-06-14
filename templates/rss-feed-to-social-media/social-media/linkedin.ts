import { Netzo } from 'netzo/mod.ts'

// Declare necesarry variables
const {
  NETZO_API_KEY,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
} = Deno.env.toObject()

const createApi = async () => {
  const linkedinScopes = "w_member_social"
  const linkedinToken = await getLinkedinTokenAuthorizationCodeFlow(LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, linkedinScopes)
  const netzo = Netzo({ apiKey: Deno.env.get(NETZO_API_KEY) })
  const linkedin = netzo.http({
    baseURL: `https://api.linkedin.com/2`,
    headers: {
      "Authorization": `Bearer ${linkedinToken}`,
      "Content-Type": "application/json"
    }
  })
  return linkedin
}

const projectURL = `https://${Deno.env.get("DENO_DEPLOYMENT_ID")}.netzo.io`

// Authentication methods

/**
 * Linkedin OAuth2.0 - Client Credential Flow (2-legged authorization (2LA)
 * with Basic Auth in request body
 * NOTE: This option grants permission for some APIs including the open API,
 * however, APIs like all Marketing APIs follow the 3-legged authorization flow
 * See: https://learn.microsoft.com/en-us/linkedin/shared/authentication/client-credentials-flow?context=linkedin%2Fcontext&view=li-lms-2022-10
 */
async function getLinkedinTokenClientCredentialFlow(client_id: any, client_secret: any) {
  const request = new Request(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
      }),
    },
  );
  console.log("Success: Retrieved new Linkedin access token via 2LA...")
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

/**
 * Linkedin OAuth2.0 - Authorization Code Flow (3-legged authorization (2LA)
 * with Basic Auth in request body
 * NOTE: This option grants permission for some APIs including the open API
 * (which allows to post/member as a user), however, APIs like all Marketing APIs
 * follow the 3-legged authorization flow (posting as organization)
 * See: https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&view=li-lms-2022-10&tabs=HTTPS
 */
async function getLinkedinTokenAuthorizationCodeFlow(client_id: any, client_secret: any, scopes: []) {
  const exchangeLinkedinCodeForToken = async (client_id: any, client_secret: any, data: any) => {
    const request = new Request(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          "grant_type": "authorization_code",
          "code": data.code,
          "client_id": client_id,
          "client_secret": client_secret,
          "redirect_uri": projectURL
        }),
      },
    );
    console.log("Success: Retrieved new Linkedin access token via 3LA...")
    const response = await fetch(request);
    const data = await response.json();
    return data;
  }

  const getLinkedinAuthorizationCode = async (client_id, client_secret, scopes) => {
    const request = new Request(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${projectURL}&state=f45sdfa3242dsfadfKef424&scope=${scopes}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      },
    );
    console.log("Success: Requested new Linkedin authorization code...")
    const response = await fetch(request);
    const data = await response.json();
    console.log("linkedin response:", data)
    const accessToken = await exchangeLinkedinCodeForToken(client_id, client_secret, data)
    return accessToken;
  };
  return getLinkedinAuthorizationCode(client_id, client_secret, scopes)
};

export async function getPostsFromLinkedin() {
  const api = await createApi()
  const response = await api.tweets.get()
  const newPost = await response.json
  console.log('tweets:', newPost)
  return new Response(JSON.stringify(newPost, null, 2), {
    headers: {
      "access-control-allow-origin": "*",
      "content-type": "application/json"
    }
  })
}

export async function newPostToLinkedin() {
  const api = await createApi()

  const response = await api.images.get(
    // {
    // title: post.title,
    // contentFormat: "markdown",
    // content: `![](https://netzo.io/images/home/all-in-one-orchestration-solution-light.png) ${post.content_html}`,
    // canonicalUrl: post.url,
    // tags: [],
    // publishStatus: "draft", // always "draft" fot testing, else "public"
    // notifyFollowers: true
    // }
  )
  // const response = await medium.me.get()
  const newPost = await response.json
  return new Response(JSON.stringify(newPost, null, 2), {
    headers: {
      "access-control-allow-origin": "*",
      "content-type": "application/json"
    }
  })
}