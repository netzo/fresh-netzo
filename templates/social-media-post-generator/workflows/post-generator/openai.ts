import { Netzo } from "netzo/mod.ts";

const netzo = Netzo(Deno.env.get("NETZO_API_KEY"))
const RESOURCE_ID_OPENAI = "63fcb1d4fa1c03083819b1f8"

const PROD: boolean = Deno.env.get("NETZO_ENV") === "production"

const { client: openai } = await netzo.getResource(RESOURCE_ID_OPENAI)

const topics = [
  {
    topic: "chatgpt artifiical intelligence",
    targetMarket: "developer",
    goal: "increase @netzoio brand awareness"

  },
  {
    topic: "netzo scripting platform benefits",
    targetMarket: "developers",
    goal: "increase @netzoio  brand awareness, drive traffic to app.netzo.io for signups"
  },
  {
    topic: "deploy workflows with netzo",
    targetMarket: "developers",
    goal: "drive traffic to netzo.io and promote @netzoio"
  }
]

const campaigns = [
  {
    "name": "30-Second Code: Netzo Quick Tips",
    "status": "PLANNED",
    "description": "This campaign would feature a series of short, 30-second videos on various coding tasks and technologies that can be accomplished quickly and easily using Netzo. Each video would demonstrate how to import a specific library, use a specific technology, or perform a specific task within the IDE. The goal of the campaign is to raise brand awayeness by showing off the speed and capabilities of Netzo, and to give potential users a sense of the platform's ease of use. The videos would be shared on social media platforms, and the campaign could also include a hashtag for users to share their own quick tips and projects created using Netzo.",
    "goals": "Increase brand awareness , Drive traffic to your website , Generate new leads , Boost brand engagement , Build a community",
    "targetMarket": "Independent developers or small development teams , Companies or organizations that are looking to automate internal operations and increase efficiency and speed of development , Companies or organizations that are interested in using modern web technologies to improve their internal operations",
    "channel": "INSTAGRAM , LINKEDIN , TWITTER , YOUTUBE, FACEBOOK",
    "ageGroup": "18-24 , 25-34 , 35-44 , 45-54",
    "gender": "MALE , FEMALE , DIVERSE",
    "education": "Bachelors degree or similar seniority in computer sciences and engineering",
    "income": "Medium to large-sized organizations: These organizations are more likely to have the budget and resources to invest in a SaaS product for their developers. , High-income industries: Certain industries such as finance , technology , healthcare , and consulting tend to have higher average income levels , and therefore may be more likely to have the budget to invest in a SaaS product for their developers.",
    "interests": "Interest in modern web technologies , Interest in improving their productivity and efficiency",
    "geolocation": "GLOBAL , EUROPE , LATIN AMERICA",
    "language": "ENGLISH",
    "expectedStartDate": "1/16/2023", //Format en-US, MM/DD/YY
    "expectedEndDate": "4/10/2023", //Format en-US, MM/DD/YY
    "plannedDuration": "12", //Weeks
    "imagePrompt": "TypeScript snippet in the backgound of a developer"
  }
]

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function randomTopicObjectFromArray(data: any[]): any {
  return data[random(0, topics.length - 1)];
}

function randomCampaignPicker(data: any[]): any {
  return data[random(0, campaigns.length - 1)];
}

export async function generateSocialMediaPosts(campaign?: any): Promise<object> {
  // const data = randomTopicObjectFromArray(topics)
  const data = campaign ?? randomCampaignPicker(campaigns)
  const instagram = await openai.completions.post({
    model: "text-davinci-003",
    prompt: `Create an Instagram optimized post in ${data.language} for a campaign titled ${data.title}. The campaign can be described as ${data.description}
    and should accomplish the following goals ${data.goals}.
    Write in a way that it is engaging to ${data.targetMarket} for ${data.gender} in the age groups ${data.ageGroup}.
    The tone should be understandable for people with at least ${data.education}
    and targets ${data.targetMarket}. Finally, shared interests for this group might include ${data.interests}.`,
    temperature: 0,
    max_tokens: 140
  });
  const linkedin = await openai.completions.post({
    model: "text-davinci-003",
    prompt: `Create a LinkedIn optimized post in ${data.language}for a campaign titled ${data.title}. The campaign can be described as ${data.description}
    and should accomplish the following goals ${data.goals}.
    Write in a way that it is engaging to ${data.targetMarket} for ${data.gender} in the age groups ${data.ageGroup}.
    The tone should be understandable for people with at least ${data.education}
    and targets ${data.targetMarket}. Finally, shared interests for this group might include ${data.interests}.`,
    temperature: 0,
    max_tokens: 140
  });
  const twitter = await openai.completions.post({
    model: "text-davinci-003",
    prompt: `Create an optimized tweet with a maximum of 280 characters in english with a random fun fact about ${data.topic} targeted to ${data.targetMarket} for ${data.gender} and include trending hashtags to the related topics.`,
    temperature: 0,
    max_tokens: 280
  });
  const youtube = await openai.completions.post({
    model: "text-davinci-003",
    prompt: `Create a YoutTube optimized title, description and script in ${data.language} for a campaign titled ${data.title}. The campaign can be described as ${data.description}
    and should accomplish the following goals ${data.goals}.
    Write in a way that it is engaging to ${data.targetMarket} for ${data.gender} in the age groups ${data.ageGroup}.
    The tone should be understandable for people with at least ${data.education}
    and targets ${data.targetMarket}. Finally, shared interests for this group might include ${data.interests}.`,
    temperature: 0,
    max_tokens: 140
  });
  const facebook = await openai.completions.post({
    model: "text-davinci-003",
    prompt: `Create a Facebook optimized post in ${data.language} for a campaign titled ${data.title}. The campaign can be described as ${data.description}
    and should accomplish the following goals ${data.goals}.
    Write in a way that it is engaging to ${data.targetMarket} for ${data.gender} in the age groups ${data.ageGroup}.
    The tone should be understandable for people with at least ${data.education}
    and targets ${data.targetMarket}. Finally, shared interests for this group might include ${data.interests}.`,
    temperature: 0,
    max_tokens: 140
  });
  return { instagram, linkedin, twitter, youtube, facebook }
}

// export async function generateSocialMediaImage(data?: any): Promise<object> {
//   // console.log(twitterPost)
//   const twitterImage = await openai.images.generations.post({
//     prompt: `${data.imagePrompt}`,
//     n: 2,
//     size: "256x256",
//     response_format: "url"
//   });
//   return { instagram, linkedin, twitterImage, youtube, facebook }
// }