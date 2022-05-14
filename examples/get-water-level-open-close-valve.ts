import { Netzo } from "https://deno.land/x/netzo/mod.ts"
const netzo = Netzo(API_KEY) // create a Netzo SDK instance

// create Services to interact with via SERVICE[PATH][METHOD]()
const waterTank = await netzo.createClient(SERVICE_ID_WATER_TANK)
const waterValve = await netzo.createClient(SERVICE_ID_WATER_VALVE)

// get state.waterLevel to open/close valve
setInterval(async () => {
    const { waterLevel } = await waterTank["/state"].get()
    if (waterLevel < 25) await waterValve["/open"].post()
    else await waterValve["/close"].post()
}, 5000) // repeat every 5 seconds