import { createApp } from "netzo/framework/mod.ts";

export default createApp({
  auth: {
    providers: {
      email: { enabled: false }
    }
  }
});
