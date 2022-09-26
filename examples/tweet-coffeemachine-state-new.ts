import { Netzo } from "https://deno.land/x/netzo/mod.ts"
const netzo = Netzo(API_KEY) // create a Netzo SDK instance

// create Services to interact with via SERVICE[PATH][METHOD]()
const coffeMachine = await netzo.createClient(SERVICE_ID_COFFE_MACHINE) // or pass options
const twitter = await netzo.createClient(SERVICE_ID_TWITTER) // or pass options

// get coffeMachine state and extract relevant properties
const state = await coffeMachine.properties.allAvailableResources.get()
const { water, milk, chocolate, coffeeBeans } = state

// post coffeMachine levels to twitter
await twitter.tweet.post({
  message: "Coffe Machine levels:" + JSON.stringify({ water, milk, chocolate, coffeeBeans })
})
