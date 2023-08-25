export default {
  pricing: {
    hero: {
      topic: 'pricing',
      title: 'Simple Pricing That Scales With You',
      description: 'Get started with a free trial or contact us for a custom plan that suits your needs.',
    },
    plans: {
      business: {
        title: 'Business',
        price: '50€',
        unit: 'per user per month',
        button: {
          variant: 'primary',
          text: 'Try for Free',
          href: 'https://api.netzo.io/oauth/auth0?redirect=/',
          target: '_blank',
        },
      },
      enterprise: {
        title: 'Enterprise',
        price: 'Custom',
        button: {
          variant: 'secondary',
          text: 'Contact Sales',
          href: 'https://calendly.com/netzo-arturoromero',
          target: '_blank',
          class: '!text-white-500 !bg-black-500',
        },
      },
    },
    items: [
      {
        type: 'subheader',
        title: 'Limits',
        description: '',
      },
      {
        title: 'Users',
        description: '',
        business: 'Up to 20',
        enterprise: 'Custom',
      },
      {
        title: 'Projects',
        description: '',
        business: '5 per user',
        enterprise: 'Custom',
      },
      {
        type: 'subheader',
        title: 'Project Limits',
        description: '',
      },
      {
        title: 'Deployments',
        description: '',
        business: '100 per project',
        enterprise: 'Custom',
      },
      {
        title: 'Requests',
        description: '',
        business: '1,000 per project',
        enterprise: 'Custom',
      },
      {
        title: 'Logs',
        description: '',
        business: '100,000 per project',
        enterprise: 'Custom',
      },
      {
        type: 'subheader',
        title: 'Other',
        description: '',
      },
      {
        title: 'Multi-tenant support',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'AI Assistant',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'GitHub integration',
        description: 'Github integration with public and private repositories',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        type: 'subheader',
        title: 'Infrastructure',
        description: '',
      },
      {
        title: 'Regions',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Region selection',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'Wildcard subdomains',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Custom domains',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'CPU time per request',
        description: 'CPU time is how many seconds the CPU was busy, not wall clock time.',
        business: 'Up to 50ms',
        enterprise: 'Up to 50ms',
      },
      {
        title: 'Inbound data transfer',
        description: 'Inbound data transfer is the data sent to your app from the internet.',
        business: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        title: 'Outbound data transfer',
        description: 'Outbound data transfer is the data sent from your app to the internet.',
        business: '100 GiB',
        enterprise: '100 GiB',
      },
      {
        type: 'subheader',
        title: 'Security',
        description: '',
      },
      {
        title: 'Audit logs',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Compliance',
        description: '',
      },
      {
        title: 'GDPR compliance',
        description: 'General Data Protection Regulation (GDPR) compliance.',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'CCPA compliance',
        description: 'California Consumer Privacy Act (CCPA) compliance.',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Support',
        description: 'A separate, dedicated support channel or a custom service-level agreement (SLA).',
        business: 'Community support',
        enterprise: 'Enterprise SLA',
      },
    ],
    faqs: {
      title: 'FAQs',
      items: [
        {
          title: 'What is a workspace?',
          description: 'Workspaces are top-level containers that own application resources. A workspace is a private environment where you can create and deploy your projects. Each workspace has a workspace plan, and is billed accordingly.',
        },
        {
          title: 'What is a user?',
          description: 'Users are members of a Workspace with a user account and a pre-defined role. The amount of users that can be part of a workspace is limited by the workspace\'s plan.',
        },
        {
          title: 'What is a project?',
          description: 'Projects are serverless applications deployed to Web URLs. A project contains all the code, data, and configuration files required to deploy and run your application. Additionally, all Deployments, Requests and Logs are associated to a project.',
        },
        {
          title: 'What is a deployment?',
          description: 'Deployments are the result of a successful execution of a Deployment in the Workspace. A deployment is a running instance of your app. You can create as many deployments as you need.',
        },
        {
          title: 'How does Enterprise pricing work?',
          description: 'Contact us at <a href="mailto:hello@netzo.io" target="_blank">hello@netzo.io</a> or via the live chat. We are happy to help!',
        },
      ],
    },
  },
}
