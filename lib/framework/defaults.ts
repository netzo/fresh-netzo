import type { AppConfig } from "./mod.ts";

export const APP_CONFIG: AppConfig = {
  title: "{{project.name}}",
  description: "{{project.description}}",
  logo: "{{project.avatar}}",
  favicon: "/favicon.svg",
  image: "{{project.avatar}}",
  auth: {
    enabled: true,
    level: "internal",
    userIds: [],
    title: "{{project.name}}",
    description: "Sign in to access the app",
    caption:
      'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a> and <a href="/" target="_blank">Privacy Policy</a>',
    providers: {
      email: { enabled: true },
      google: {
        enabled: false,
        clientId: "{{project.envVars.development.GOOGLE_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GOOGLE_CLIENT_SECRET}}",
      },
      azure: {
        enabled: false,
        clientId: "{{project.envVars.development.AZURE_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.AZURE_CLIENT_SECRET}}",
      },
      github: {
        enabled: false,
        clientId: "{{project.envVars.development.GITHUB_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GITHUB_CLIENT_SECRET}}",
      },
      gitlab: {
        enabled: false,
        clientId: "{{project.envVars.development.GITLAB_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GITLAB_CLIENT_SECRET}}",
      },
      auth0: {
        enabled: false,
        clientId: "{{project.envVars.development.AUTH0_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.AUTH0_CLIENT_SECRET}}",
        domain: "{{project.envVars.development.AUTH0_DOMAIN}}",
      },
      okta: {
        enabled: false,
        clientId: "{{project.envVars.development.OKTA_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.OKTA_CLIENT_SECRET}}",
        domain: "{{project.envVars.development.OKTA_DOMAIN}}",
      },
      oauth2: {
        enabled: false,
        clientId: "{{project.envVars.development.OAUTH2_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.OAUTH2_CLIENT_SECRET}}",
        authorizationEndpointUri: "https://custom.com/oauth/authorize",
        tokenUri: "https://custom.com/oauth/token",
        redirectUri: "https://my-site.com/another-dir/callback",
      },
    },
  },
  layout: {
    enabled: true,
    nav: {
      items: [],
    },
    header: {
      title: "{{project.name}}",
      description: "{{project.description}}",
      image: "{{project.avatar}}",
    },
    footer: {
      innerHTML: `<a href="https://netzo.io/" target="_blank">
  <img
    src="https://netzo.io/logos/built-with-netzo-light.svg"
    alt="Built with Netzo"
    class="h-[32px]"
  />
</a>`,
    },
  },
  theme: {
    enabled: true,
    color: "slate",
    radius: 0.5,
  },
  pages: {
    enabled: true,
    _404: { enabled: true },
    _500: { enabled: true },
  },
  api: {
    enabled: true,
    path: "",
    idField: "",
    methods: ["find", "get", "create", "update", "patch", "remove"],
    services: [],
  },
  devtools: {
    bindSignal: { enabled: true },
  },
};
