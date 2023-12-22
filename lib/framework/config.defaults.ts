import type { NetzoConfig } from "./mod.ts";

export const CONFIG: NetzoConfig = {
  auth: {
    enabled: false,
    level: "internal",
    title: "{{project.name}}",
    description: "Sign in to access the app",
    caption:
      'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a> and <a href="/" target="_blank">Privacy Policy</a>',
    providers: {
      email: { enabled: false },
      google: {
        enabled: false,
        clientId: "{{GOOGLE_CLIENT_ID}}",
        clientSecret: "{{GOOGLE_CLIENT_SECRET}}",
      },
      github: {
        enabled: false,
        clientId: "{{GITHUB_CLIENT_ID}}",
        clientSecret: "{{GITHUB_CLIENT_SECRET}}",
      },
      gitlab: {
        enabled: false,
        clientId: "{{GITLAB_CLIENT_ID}}",
        clientSecret: "{{GITLAB_CLIENT_SECRET}}",
      },
      auth0: {
        enabled: false,
        clientId: "{{AUTH0_CLIENT_ID}}",
        clientSecret: "{{AUTH0_CLIENT_SECRET}}",
        domain: "{{AUTH0_DOMAIN}}",
      },
      okta: {
        enabled: false,
        clientId: "{{OKTA_CLIENT_ID}}",
        clientSecret: "{{OKTA_CLIENT_SECRET}}",
        domain: "{{OKTA_DOMAIN}}",
      },
    },
  },
  ui: {
    head: {
      enabled: false,
      title: "{{project.name}}",
      description: "{{project.description}}",
      favicon: "/favicon.svg",
      image: "{{project.avatar}}",
    },
    nav: {
      enabled: false,
      items: [],
    },
    header: {
      enabled: false,
      title: "{{project.name}}",
      description: "{{project.description}}",
      image: "{{project.avatar}}",
    },
    footer: {
      enabled: true,
      innerHTML: "",
    },
    theme: {
      enabled: false,
      color: "blue",
      radius: 0.5,
    },
  },
  api: {
    enabled: false,
    path: "/api",
    idField: "id",
    methods: ["find", "get", "create", "update", "patch", "remove"],
  },
  devtools: {
    bindSignal: { enabled: true },
  },
};
