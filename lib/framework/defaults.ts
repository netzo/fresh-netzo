import type { AppConfig } from "./mod.ts";

export const PROJECT_CONFIG: AppConfig = {
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
      email: { enabled: false },
      google: {
        enabled: false,
        clientId: "{{project.envVars.development.GOOGLE_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GOOGLE_CLIENT_SECRET}}",
        redirectUri: "/auth/google/callback",
      },
      github: {
        enabled: false,
        clientId: "{{project.envVars.development.GITHUB_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GITHUB_CLIENT_SECRET}}",
        redirectUri: "/auth/github/callback",
      },
      gitlab: {
        enabled: false,
        clientId: "{{project.envVars.development.GITLAB_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.GITLAB_CLIENT_SECRET}}",
        redirectUri: "/auth/gitlab/callback",
      },
      auth0: {
        enabled: false,
        clientId: "{{project.envVars.development.AUTH0_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.AUTH0_CLIENT_SECRET}}",
        domain: "{{project.envVars.development.AUTH0_DOMAIN}}",
        redirectUri: "/auth/auth0/callback",
      },
      okta: {
        enabled: false,
        clientId: "{{project.envVars.development.OKTA_CLIENT_ID}}",
        clientSecret: "{{project.envVars.development.OKTA_CLIENT_SECRET}}",
        domain: "{{project.envVars.development.OKTA_DOMAIN}}",
        redirectUri: "/auth/okta/callback",
      },
    },
  },
  layout: {
    enabled: true,
    nav: {
      items: [
        {
          text: "Overview",
          items: [
            { icon: "mdi-home", text: "Home", href: "/" },
            { icon: "mdi-web", text: "Website", href: "https://netzo.io/" },
          ],
        },
      ],
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
