import { legalEN } from '../.vitepress/config.sidebar'

const contactUs = '<u><a href="https://calendar.app.google/uHEnkfwpgYSM1ppN6">Contact us</a></u>'

export default {
  home: {
    hero: {
      topic: 'Designed for Modern Businesses',
      title: 'The smartest way to build business software',
      description: 'Ship custom business solutions in record time. Netzo is the most flexible way to build and manage mission-critical internal software solutions that fit your organization\'s evolving needs.',
      buttons: [
        {
          type: 'book-a-call',
          text: 'Book a Call',
        },
        // {
        //   type: 'video-scroll',
        //   text: 'Watch 1 min Intro',
        //   href: '#section-save-time-and-money',
      ],
      image: {
        alt: 'Netzo - The smartest way to build business software',
        src: '/images/home/hero.svg',
      },
      // items: [
      //   {
      //     icon: 'i-mdi-check-circle-outline',
      //     title: 'Integrate anything',
      //   },
      //   {
      //     icon: 'i-mdi-check-circle-outline',
      //     title: 'Ship in hours, not months',
      //   },
      //   {
      //     icon: 'i-mdi-check-circle-outline',
      //     title: 'Scale effortlessly',
      //   },
      //   {
      //     icon: 'i-mdi-check-circle-outline',
      //     title: 'Enterprise ready',
      //   },
      // ],
    },
    sectionBackedBy: 'Backed by',
    sectionSaveTimeAndMoney: {
      topic: 'Save Time and Money',
      title: 'Why spend millions and months developing business software?',
      description: 'Optimize your operations, manage data, and increase your company\'s productivity quickly and cost-effectively. Replace complex internal developments with Netzo, the platform that streamlines and accelerates the development of business software, allowing you to focus on your core activities.',
      items: [
        {
          icon: 'i-mdi-fast-forward',
          title: 'From idea to production 10x faster',
          description: 'No matter what you need to build, Netzo eliminates the time-consuming complexities that take upwards of 95% of development time.',
        },
        {
          icon: 'i-mdi-piggy-bank',
          title: 'Costs less than building from scratch',
          description: 'Whether building a dashboard or automating a workflow, save on maintenance, personnel, and the unforeseen.',
        },
        {
          icon: 'i-mdi-chart-gantt',
          title: 'Embrace agile methodology with ease',
          description: 'Adapt and iterate quickly to keep your mission-critical tools seamlessly aligned with your evolving processes and needs.',
        },
      ],
      buttons: [
        {
          type: 'book-a-call',
          text: 'Talk with an Expert',
        },
      ],
    },
    sectionWhy: {
      topic: 'Why use Netzo?',
      title: 'Do you identify with these problems?',
      description: 'Small issues accumulate and negatively impact your bottom line by costing you up to 30% of your revenue while also causing you to miss out on opportunities by diverting your focus from core activities.',
      items: [
        {
          icon: 'i-mdi-clock-alert text-accent-500',
          title: 'Spending too much time on repetitive, low-value, tasks',
        },
        {
          icon: 'i-mdi-chart-timeline-variant-shimmer text-accent-500',
          title: 'Lack of access to critical business data',
        },
        {
          icon: 'i-mdi-microsoft-excel text-accent-500',
          title: 'Excessive dependence on spreadsheets',
        },
        {
          icon: 'i-mdi-bell-alert text-accent-500',
          title: 'Errors in data between systems and spreadsheets',
        },
        {
          icon: 'i-mdi-emoticon-dead text-accent-500',
          title: 'Overworked development team',
        },
        {
          icon: 'i-mdi-lan-disconnect text-accent-500',
          title: 'Difficulty collaborating between teams and departments',
        },
      ],
      // buttons: [
      //   {
      //     type: 'learn-more',
      //     text: 'Learn More',
      //     href: '/docs/introduction/getting-started',
      //   },
      // ],
    },
    sectionWhatCanYouBuild: {
      topic: 'What can you build?',
      title: 'Adaptable solutions your teams truly need',
      description: 'Build business-critical software solutions quickly and at a fraction of the traditional costs. Create business intelligence dashboards, enhance operations with admin panels, automated workflows, implement AI technologies into existing processes and structure data to enable seamless information exchange, all from a single place.',
      items: [
        {
          uid: 'app-know-your-customer-dashboard',
          title: 'Know-Your-Customer Dashboard',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-know-your-customer-dashboard/icon.svg',
          },
        },
        {
          uid: 'app-sales-dashboard',
          title: 'Sales Dashboard',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-sales-dashboard/icon.svg',
          },
        },
        {
          uid: 'workflow-capture-webhook-data-to-hubspot-resource',
          title: 'Capture Webhook data to HubSpot',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-hubspot-resource/icon.svg',
          },
        },
        {
          uid: 'api-department-metrics',
          title: 'Department Metrics API',
          image: {
            src: '/images/home/apis.svg',
          },
        },
        {
          uid: 'app-gdpr-data-export-utility',
          title: 'GDPR Data Export Utility',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-gdpr-data-export-utility/icon.png',
          },
        },
        {
          uid: 'workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies',
          title: 'Send Waalaxy leads to Active- Campaign contacts & companies',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies/icon.svg',
          },
        },
      ],
      buttons: [
        {
          variant: 'secondary',
          text: 'See More',
          href: '/docs/use-cases/apps',
        },
      ],
    },
    sectionForModernEnterprises: {
      topic: 'For Modern Enterprises',
      title: 'Engineered to scale.<br>Netzo alligns with the demands of modern enterprises.',
      items: [
        {
          icon: 'i-mdi-arrow-expand-all',
          title: 'Scales Seamlessly',
          description: 'Our code-first approach gives you complete flexibility and control to adapt as you grow.',
        },
        {
          icon: 'i-mdi-lock-open-variant-outline',
          title: 'No Vendor Lock-in',
          description: 'Develop using modern, open web standards, ensuring you aren\'t locked into a proprietary system.',
        },
        {
          icon: 'i-mdi-security',
          title: 'Secure by Default',
          description: 'Built on-top of secure technology, Netzo provides you with peace of mind and robust protection.',
        },
        {
          icon: 'i-mdi-cloud-upload',
          title: 'Instant Cloud Deployments',
          description: 'Deploy instantly in the cloud and scale at your own pace, without the heachaches of infrastructure.',
        },
        // {
        //   icon: 'i-mdi-cloud-lock',
        //   title: 'Role based access control (RBAC)',
        //   description: 'RBAC to ensure smooth and hassle-free access.',
        // },
        {
          icon: 'i-mdi-alert-box',
          title: 'Audit Logs',
          description: 'Detailed audit logs so you can track and monitor all your Workspace activities.',
        },
        {
          icon: 'i-mdi-card-account-details-star',
          title: 'Support and Professional Services',
          description: 'We offer support and professional services to assist you every step of the way.',
        },
      ],
    },
    // sectionHow: {
    //   topic: 'How does it work?',
    //   title: 'The versatility of code without the headaches',
    //   description: 'Say goodbye to costly, time-consuming and unmaintainable developments. Enjoy all the perks of full code control without any major efforts or maintenance requirements while building your back-office .',
    //   items: [
    //     {
    //       topic: 'Code',
    //       title: 'Maximum flexibility for developers via <code>JS</code>/<code>TS</code>',
    //       description: 'Create with confidence and flexibility. Build UIs with <code>JSX</code>/<code>TSX</code>, create (HTTP) APIs to power your apps and build multi-step workflows with full control over your scripts.',
    //       image: {
    //         alt: 'Code anything in JS/TS',
    //         src: '/images/home/1-code.svg',
    //         isGIF: true,
    //       },
    //       // items: [
    //       //   {
    //       //     icon: 'i-mdi-code-braces',
    //       //     title: 'Code online or locally via the Netzo CLI',
    //       //   },
    //       //   {
    //       //     icon: 'i-mdi-bug',
    //       //     title: 'Debug fast with logs, metrics and error tracking',
    //       //   },
    //       //   {
    //       //     icon: 'i-mdi-api',
    //       //     title: 'Integrate any APIs, DBs or import your favorite libraries via URLs',
    //       //   },
    //       // ],
    //     },
    //     {
    //       topic: 'Deploy',
    //       title: 'Ship faster and iterate at your pace',
    //       description: 'Easily deploy, modify, and maintain software solutions. Eliminate infrastructure overhead and focus on what truly matters: driving your business forward.',
    //       image: {
    //         alt: 'Deploy instantly, skip the DevOps',
    //         src: '/images/home/2-deploy.svg',
    //         isGIF: true,
    //       },
    //       // items: [
    //       //   {
    //       //     icon: 'i-ic-baseline-hub',
    //       //     title: 'Centralize team efforts, drive adoption and avoid double work',
    //       //   },
    //       //   {
    //       //     icon: 'i-mdi-git',
    //       //     title: 'Continuous development, version control and environment support',
    //       //   },
    //       //   {
    //       //     icon: 'i-mdi-finance',
    //       //     title: 'Built-in analytics for real-time insights',
    //       //   },
    //       // ],
    //     },
    //     {
    //       topic: 'Share',
    //       title: 'Collaborate and boost team productivity',
    //       description: 'Enable seamless collaboration and foster a closed feedback loop between teams and developers. Confidently create and share custom internal apps without extensive technical teams.',
    //       image: {
    //         alt: 'Collaborate and boost team productivity',
    //         src: '/images/home/3-share.svg',
    //         isGIF: true,
    //       },
    //       // items: [
    //       //   {
    //       //     icon: 'i-mdi-share-variant',
    //       //     title: 'Share instantly and securely with groups and permissions',
    //       //   },
    //       //   {
    //       //     icon: 'i-mdi-police-badge',
    //       //     title: 'Audit logging for compliance, security and usage insights',
    //       //   },
    //       //   {
    //       //     icon: 'i-ic-outline-feedback',
    //       //     title: 'Adapt faster with internal feedback and feature requests',
    //       //   },
    //       // ],
    //     },
    //   ],
    // },
    // sectionHowIsNetzoDifferentForDevelopers: {
    //   topic: 'Developer-centric',
    //   title: 'Superpowers for developers',
    //   items: [
    //     {
    //       icon: 'i-mdi-view-dashboard-outline',
    //       description: '<strong style="color: #0080ff"><a href="/docs/use-cases/apps">Use Cases</a></strong> to kickstart custom implementations in seconds',
    //     },
    //     {
    //       icon: 'i-mdi-star-four-points',
    //       description: '<strong style="color: #0080ff"><a href="/docs/framework/apis">Integrations</a></strong> to hundreds of APIs without reading docs',
    //     },
    //     {
    //       icon: 'i-mdi-hexagon-multiple',
    //       description: '<strong style="color: #0080ff"><a href="/docs/framework/components">UI components</a></strong>, <strong style="color: #0080ff"><a href="/docs/framework/plugins">Plugins</a></strong> and <strong style="color: #0080ff"><a href="/docs/framework/utils">Utilities</a></strong> for speed and simplicity',
    //     },
    //     {
    //       icon: 'i-mdi-bug',
    //       description: '<strong style="color: #0080ff"><a href="/docs/platform/projects/logs">Logs</a></strong> and metrics for real-time observability and control',
    //     },
    //     {
    //       icon: 'i-mdi-send-clock',
    //       description: '<strong style="color: #0080ff"><a href="">Cron Job</a></strong> scheduling',
    //     },
    //     {
    //       icon: 'i-mdi-database-lock',
    //       description: 'Integrated <strong style="color: #0080ff"><a href="">KV Storage</a></strong> (soon)',
    //     },
    //     {
    //       icon: 'i-mdi-microsoft-visual-studio-code',
    //       description: '<strong style="color: #0080ff"><a href="/docs/framework/cli">CLI</a></strong> for local development',
    //     },
    //     {
    //       icon: 'i-mdi-git',
    //       description: '<strong style="color: #0080ff"><a href="">Git support</a></strong> for version control',
    //     },
    //     {
    //       icon: 'i-mdi-rocket-launch',
    //       description: '<strong style="color: #0080ff">Deploy in one click</strong> without configuration or DevOps',
    //     },
    //   ],
    // },
    // sectionHowIsNetzoDifferent: {
    //   topic: 'How is Netzo different?',
    //   // title: 'Built on the most modern and secure technologies',
    //   title: 'Gain a competitive advantage with cutting-edge tech',
    //   items: [
    //     {
    //       icon: 'i-logos-deno',
    //       title: 'Powered by Deno',
    //       description: 'Built on the next generation JavaScript and TypeScript runtime to boost DX.',
    //     },
    //     {
    //       icon: 'i-mdi-nodejs',
    //       title: 'Full Node.js and NPM support',
    //       description: 'Code with your favorite libraries with Node.js built-in modules and NPM package support.',
    //     },
    //     {
    //       icon: 'i-fxemoji-lightningmood',
    //       title: 'Serverless',
    //       description: 'Instantly deploy your code globally to the edge. No infrastructure to provision or manage.',
    //     },
    //     {
    //       icon: 'i-logos-typescript-icon',
    //       title: 'Native TypeScript',
    //       description: 'Use TypeScript without builds or complex setups. Enjoy auto-completion and type safety.',
    //     },
    //     {
    //       icon: 'i-mdi-package-variant-closed',
    //       title: 'URL imports and enhanced portability',
    //       description: 'Forget <code>node_modules</code>. Import code directly from versioned URLs without installation.',
    //     },
    //     {
    //       icon: 'i-mdi-asterisk',
    //       title: 'Managed secrets',
    //       description: 'Keep secrets safe through an extra layer of security and re-use them fast when coding.',
    //     },
    //     {
    //       icon: 'i-mdi-console',
    //       title: 'Code locally via the Netzo CLI',

    //       description: 'Code in your favorite IDE and deploy to the cloud using <code>netzo/cli</code> with no extra setup or tooling.',
    //     },
    //     {
    //       icon: 'i-mdi-toolbox',
    //       title: 'Built-in toolbox of components and utilities',
    //       description: 'Import from <code>netzo</code>, a toolbox of components and utilities made to 10x your DX when developing software solutions.',
    //     },
    //   ],
    // },
    // sectionWhoIsNetzoFor: {
    //   topic: 'Who is Netzo for?',
    //   title: 'A central hub for teams in technology-driven businesses',
    //   image: {
    //     alt: 'Who is Netzo for?',
    //     src: '/images/home/code-deploy-share-feedback.svg',
    //     class: 'mb-8',
    //   },
    //   items: [
    //     {
    //       title: 'Developer Teams',
    //       description: 'Code, deploy, and share anything instantly, with total control and without managing infrastructure.',
    //       image: {
    //         alt: 'Developer Teams',
    //         src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMiA1LjVBMy41IDMuNSAwIDAgMSAxNS41IDlhMy41IDMuNSAwIDAgMS0zLjUgMy41QTMuNSAzLjUgMCAwIDEgOC41IDlBMy41IDMuNSAwIDAgMSAxMiA1LjVNNSA4Yy41NiAwIDEuMDguMTUgMS41My40MmMtLjE1IDEuNDMuMjcgMi44NSAxLjEzIDMuOTZDNy4xNiAxMy4zNCA2LjE2IDE0IDUgMTRhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zbTE0IDBhMyAzIDAgMCAxIDMgM2EzIDMgMCAwIDEtMyAzYy0xLjE2IDAtMi4xNi0uNjYtMi42Ni0xLjYyYTUuNTM2IDUuNTM2IDAgMCAwIDEuMTMtMy45NmMuNDUtLjI3Ljk3LS40MiAxLjUzLS40Mk01LjUgMTguMjVjMC0yLjA3IDIuOTEtMy43NSA2LjUtMy43NXM2LjUgMS42OCA2LjUgMy43NVYyMGgtMTN2LTEuNzVNMCAyMHYtMS41YzAtMS4zOSAxLjg5LTIuNTYgNC40NS0yLjljLS41OS42OC0uOTUgMS42Mi0uOTUgMi42NVYyMEgwbTI0IDBoLTMuNXYtMS43NWMwLTEuMDMtLjM2LTEuOTctLjk1LTIuNjVjMi41Ni4zNCA0LjQ1IDEuNTEgNC40NSAyLjlWMjBaIi8+PC9zdmc+',
    //       },
    //     },
    //     {
    //       title: 'SMBs and Startups',
    //       description: 'Scale your operations with custom business software and workflow automation without breaking the bank.',
    //       image: {
    //         alt: 'Startups and SMBs',
    //         src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMiAxOEg2di00aDZtOSAwdi0ybC0xLTVINGwtMSA1djJoMXY2aDEwdi02aDR2Nmgydi02bTAtMTBINHYyaDE2VjRaIi8+PC9zdmc+',
    //       },
    //     },
    //     {
    //       title: 'Enterprises',
    //       description: 'Increase operational efficiency with tailored software solutions and 100% adaptability to established processes.',
    //       image: {
    //         alt: 'Enterprises',
    //         src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01IDN2MThoNnYtMy41aDJWMjFoNlYzSDVtMiAyaDJ2Mkg3VjVtNCAwaDJ2MmgtMlY1bTQgMGgydjJoLTJWNU03IDloMnYySDdWOW00IDBoMnYyaC0yVjltNCAwaDJ2MmgtMlY5bS04IDRoMnYySDd2LTJtNCAwaDJ2MmgtMnYtMm00IDBoMnYyaC0ydi0ybS04IDRoMnYySDd2LTJtOCAwaDJ2MmgtMnYtMloiLz48L3N2Zz4=',
    //       },
    //     },
    //   ],
    // },
    // sectionQuote: {
    //   name: 'McKinsey',
    //   title: 'June 15, 2022',
    //   description: 'Nearly 70% of the top economic performers, compared with just half of their peers, are using their own software to differentiate themselves from their competitors.',
    //   image: {
    //     src: 'https://assets.weforum.org/organization/image/XB_v8gTmMvNAsC43PvwUSIocLfXrmGkb7MQpQZYksvQ.jpg',
    //     alt: 'McKinsey logo',
    //     width: 150,
    //     height: 48,
    //   },
    // },
    sectionBannerCta: {
      title: 'Ready to get started?',
      // items: [
      //   { text: 'Create your digital back-office with full-code control' },
      //   { text: 'Deploy instantly and iterate fast, without the headaches' },
      //   { text: 'Share with your team and grow your business' },
      // ],
      buttons: [
        {
          type: 'book-a-call',
          text: 'Book a Call',
        },
      ],
    },
  },
  blog: {
    hero: {
      topic: 'blog',
      title: 'The Latest Netzo News',
      description: 'Stay updated on latest new, tips and tricks from the Netzo team and the community.',
    },
    banner: '<a href="#newsletter">Subscribe to receive updates!</a>',
  },
  contact: {
    general: {
      hero: {
        topic: 'Contact',
        title: 'Get Started with Netzo',
        description: 'Please fill out the form below and we will get back to you as soon as possible.',
        buttons: [
          {
            type: 'book-a-call',
            text: 'Book a Call',
          },
        ],
      },
    },
  },
  designKit: {
    hero: {
      topic: 'Design Kit',
      title: 'Share Your Netzo Creations',
      description: 'Our logos and brand are available for use when you link them to the netzo.io website and respect our trademark policy. We encourage you to use them for solutions powered by Netzo.',
    },
    banner: 'Right-click on the image and select \'Save image as...\'',
  },
  pricing: {
    hero: {
      topic: 'pricing',
      title: 'Flexible Pricing that Scales with You',
      description: 'Contact us to get you started with a plan that suits your needs.',
    },
    plans: {
      business: {
        title: 'Business',
        // price: 'Custom',
        // unit: 'per month',
        button: {
          variant: 'primary',
          text: 'Contact Sales',
          href: 'https://calendar.app.google/tnmzyUswAVUomHDs7',
          target: '_blank',
        },
      },
      enterprise: {
        title: 'Enterprise',
        // price: 'Custom',
        button: {
          variant: 'secondary',
          text: 'Contact Sales',
          href: 'https://calendar.app.google/tnmzyUswAVUomHDs7',
          target: '_blank',
          class: '!text-white-500 !bg-black-500',
        },
      },
    },
    items: [
      {
        type: 'subheader',
        title: 'Users',
        description: 'Users are members of a Workspace with a user account and a pre-defined role. The amount of users that can be part of a workspace is limited by the workspace\'s plan.',
      },
      {
        title: 'Included Users',
        description: 'Users included in your workspace subscription plan.',
        business: ['5', 'Contact us for additional user pricing.'],
        enterprise: 'Custom',
      },
      {
        title: 'User limits',
        description: 'Maximum number of Workspace users in the subscription tier.',
        business: '20',
        enterprise: 'Unlimited',
      },
      {
        type: 'subheader',
        title: 'Workspace Resources',
        description: '',
      },
      {
        title: 'Projects',
        description: 'Projects are web applications. Each project contains its own deployments, databases, logs, and more.',
        business: '20',
        enterprise: 'Custom',
      },
      {
        title: 'Requests',
        description: 'Requests are HTTP requests made to invoke any of a Project\'s deployments.',
        business: ['50k per month', 'Contact us for additional request pricing.'],
        enterprise: 'Custom',
      },
      {
        title: 'Database',
        description: 'Included storage capacity for all Projects in a Workspace.',
        business: ['5GB', 'Contact us for additional storage pricing.'],
        enterprise: 'Custom',
      },
      {
        title: 'Data throughput',
        description: 'Amount of data passed through all your Projects in a given month.',
        business: ['1 GB per month', 'Contact us for additional data throughput pricing.'],
        enterprise: 'Custom',
      },
      {
        title: 'Notification retention',
        description: 'Retention period for (Inbox) notifications.',
        business: '30 days',
        enterprise: '365 days',
      },
      {
        title: 'Project log retention',
        description: 'Retention period for Project logs.',
        business: '30 days',
        enterprise: '365 days',
      },
      {
        type: 'subheader',
        title: 'Modules & Features',
        description: '',
      },
      {
        title: 'App launcher',
        description: 'Securely share custom business apps in one-click.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Inbox',
        description: 'Trigger custom notifications to a User\'s Inbox in a single line of code.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Studio',
        description: 'Code preview and auditing to ensure code quality and security.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'CLI',
        description: 'Command line interface to streamline local development.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Logs',
        description: 'Real-time logging of deployed Project usage and errors.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Requests',
        description: 'Testing and debugging tool for Project requests and responses.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Databases',
        description: 'Built-in key value store scoped to your Project and from a single line of code.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'API integrations',
        description: 'Easily integrate any APIs with minimal setup and authentication wrangling',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Schedules',
        description: 'Run your projects on a schedule using CRON jobs.',
        business: { class: 'i-mdi-clock-outline' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Templates',
        description: 'Kickstart custom implementations in seconds with our growing library of templates.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Deployments',
        description: '',
      },
      {
        title: 'Versioned Deployments',
        description: '',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Rollback Deployments',
        description: 'Revert to a previous deployment version in a single click.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Wildcard subdomains',
        description: 'Wildcard *.netzo.dev subdomains for all your Projects.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Custom domains',
        description: 'Use your own custom domains for all your Projects.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Region selection',
        description: 'Choose deployment regions for databases and projects.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'CPU time per request',
        description: 'CPU time is how many seconds the CPU was busy, not wall clock time.',
        business: 'Up to 50ms',
        enterprise: 'Custom',
      },
      {
        type: 'subheader',
        title: 'Security',
        description: '',
      },
      {
        title: 'Source control',
        description: 'Version control your code with Git, the way you already do.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Workspace API keys',
        description: 'API keys scoped to all your Workspace resources.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Project API keys',
        description: 'API keys scoped to individual Projects.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Audit logs',
        description: 'Logs on user activity and Workspace changes.',
        business: '30 days',
        enterprise: '365 days',
      },
      {
        title: 'SAML and single-sign on (SSO)',
        description: 'Use your existing identity provider to manage access to Netzo.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        type: 'subheader',
        title: 'Support',
        description: '',
        business: 'Advanced',
        enterprise: 'Enterprise',
      },
      {
        title: 'Community support',
        description: 'Via our Discord community server.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Email support',
        description: '',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Standard support hours',
        description: 'Monday to Friday from 9:00 to 19:00 (GMT+2).',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Extended support hours',
        description: 'Saturdays from 12:00 to 18:00 (GMT+2).',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Roadmap prioritization',
        description: 'Get early access and help us shape new features.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Dedicated account manager',
        description: 'Gain access to a dedicated account manager and Netzo engineering support.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Dedicated channel',
        description: 'Gain access to a dedicated channel for support and feedback via Discord.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Professional services',
        description: 'We help you build and ship custom apps, onboard and train teams, define your technical strategy, and implement best practices across your organization.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'DPA',
        description: 'DPA (Data Processing Agreement) between both Parties.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Invoice billing',
        description: 'Pay via invoice instead of credit card.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Custom SLA',
        description: '',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      // {
      //   title: 'Reliability SLA',
      //   description: 'Reliability Service Level Agreement (SLA) tailored to the reliability requirements of your organization.',
      //   start: { class: 'i-mdi-minus' },
      //   business: { class: 'i-mdi-minus' },
      //   enterprise: { class: 'i-mdi-clock-outline' },
      // },
    ],
    faqs: {
      title: 'FAQs',
      items: [
        {
          title: 'What is a workspace?',
          description: 'Workspaces are top-level containers that own application resources. A workspace is a private environment where you can create and deploy your projects. Each workspace has a workspace plan, and is billed accordingly.',
        },
        {
          title: 'What is a user (internal)?',
          description: 'Are members of a Workspace with a Netzo user account and a pre-defined role. The amount of users that can be part of a workspace is limited by the workspace\'s plan.',
        },
        {
          title: 'What is a user (external)?',
          description: 'Are end users of a Project (usually with an user interface). If you wish to know more about this feature, please get in touch.',
        },
        {
          title: 'What is a project?',
          description: 'Are serverless applications deployed to Web URLs. A project contains all the code, data, and configuration files required to deploy and run your application. Additionally, all Deployments, Databases, Requests and Logs are associated to a project.',
        },
        {
          title: 'What is a deployment?',
          description: 'Are the result of a successful "build" of a Project and its deployment to a Web URL. A Deployment is a running instance of your app. You can create as many deployments as you need.',
        },
      ],
    },
  },
  footer: {
    items: [
      {
        text: 'Products',
        items: [
          { text: 'Apps', link: '/products/apps' },
          { text: 'Inbox', link: '/products/inbox' },
          { text: 'Projects', link: '/products/projects' },
          { text: 'Storage (soon)', link: '/products/storage' },
          { text: 'Auth', link: '/products/auth' },
          { text: 'Database', link: '/products/database' },
          { text: 'Workflows (soon)', link: '/products/workflows' },
          { text: 'Analytics (soon)', link: '/products/analytics' },
        ],
      },
      {
        text: 'Use Cases',
        items: [
          { text: 'Apps', link: '/docs/use-cases/apps' },
          { text: 'APIs', link: '/docs/use-cases/apis' },
          { text: 'Workflows', link: '/docs/use-cases/workflows' },
        ],
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Docs',
            link: '/docs/introduction/getting-started',
          },
          // {
          //   text: 'Help Center',
          //   link: 'https://help.netzo.io',
          // },
          {
            text: 'Contact',
            link: 'mailto:help@netzo.io?subject=%20How%20can%20we%20help%3F',
          },
          {
            text: 'Design Kit',
            link: '/design-kit',
          },
        ],
      },
      {
        text: 'Legal',
        items: [
          ...legalEN.items,
          { text: 'Privacy Settings', onClick: () => window.UC_UI.showSecondLayer() },
        ],
      },
    ],
  },
  modules: [
    {
      uid: 'apis',
      title: 'APIs',
      description: 'The <code>netzo/apis</code> module exports all the API integrations currently supported. Each API integration is a function that returns a typed client for the API.',
      display: { src: 'https://api.iconify.design/mdi-star-four-points.svg?color=%239ca3af' },
      href: '/docs/framework/apis',
    },
    {
      uid: 'auth',
      title: 'Auth',
      description: 'The <code>netzo/auth</code> module exports a set of utility functions to authenticate users in your projects.',
      display: { src: 'https://api.iconify.design/mdi-account-lock.svg?color=%239ca3af' },
      href: '/docs/framework/auth',
    },
    {
      uid: 'cli',
      title: 'CLI',
      description: 'The <code>netzo/cli</code> module is a command line tool to streamline local development of projects in Netzo.',
      display: { src: 'https://api.iconify.design/mdi-console.svg?color=%239ca3af' },
      href: '/docs/framework/cli',
    },
    {
      uid: 'database',
      title: 'Database',
      description: 'The <code>netzo/database</code> module exports a set of utility functions to interact with the project\'s datastore.',
      display: { src: 'https://api.iconify.design/mdi-database.svg?color=%239ca3af' },
      href: '/docs/framework/database',
    },
    {
      uid: 'components',
      title: 'Components',
      description: 'The <code>netzo/components</code> module is a collection of UI components written in Preact (TSX) and built with Radix UI and UnoCSS.',
      display: { src: 'https://api.iconify.design/mdi-widgets.svg?color=%239ca3af' },
      href: '/docs/framework/components',
    },
    {
      uid: 'plugins',
      title: 'Plugins',
      description: 'The <code>netzo/plugins</code> module exports all official Plugins to essential functionality to your projects in a plug-and-play fashion.',
      display: { src: 'https://api.iconify.design/mdi-extension.svg?color=%239ca3af' },
      href: '/docs/framework/plugins',
    },
    // {
    //   uid: 'utils',
    //   title: 'Utils',
    //   description: 'The <code>netzo/utils</code> module exports a set of utilities for common functionality.',
    //   display: { src: 'https://api.iconify.design/mdi-function-variant.svg?color=%239ca3af' },
    //   href: '/docs/framework/utils',
    // },
  ].sort((a, b) => a.uid.localeCompare(b.uid)),
  apis: [
    {
      uid: 'activecampaign',
      title: 'ActiveCampaign',
      description: 'ActiveCampaign is a customer experience automation (CXA) platform that helps businesses better engage customers. Access your ActiveCampaign data and automate your marketing, sales, and support processes.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/activecampaign.svg' },
      href: '/docs/framework/apis/activecampaign',
    },
    {
      uid: 'airtable',
      title: 'Airtable',
      description: 'Airtable is a low-code platform for building collaborative apps. Customize your workflow, collaborate, and achieve ambitious outcomes. Get started for free.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/airtable.svg' },
      href: '/docs/framework/apis/airtable',
    },
    {
      uid: 'brevo',
      title: 'Brevo',
      description: 'Brevo is a platform that allows you to create and manage your own chatbots. It is a tool that allows you to create and manage your own chatbots. It is a tool that allows you to create and manage your own chatbots.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/brevo.svg' },
      href: '/docs/framework/apis/brevo',
    },
    {
      uid: 'chartmogul',
      title: 'ChartMogul',
      description: 'ChartMogul is a subscription analytics platform, helping you to measure, understand and grow your subscription business.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/chartmogul.svg' },
      href: '/docs/framework/apis/chartmogul',
    },
    {
      uid: 'clickup',
      title: 'ClickUp',
      description: 'ClickUp is a productivity platform that provides a fundamentally new way to work. More than just task management - ClickUp offers notes, reminders, goals, calendar, scheduling, and even an inbox. Fully customizable, ClickUp works for every type of team, so all teams can use the same app to plan, organize, and collaborate.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/clickup.svg' },
      href: '/docs/framework/apis/clickup',
    },
    {
      uid: 'cloudflare',
      title: 'Cloudflare',
      description: 'Cloudflare is a web performance and security company that provides online services to protect and accelerate websites online.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/cloudflare.svg' },
      href: '/docs/framework/apis/cloudflare',
    },
    {
      uid: 'contpaqicomercial',
      title: 'CONTPAQi Comercial',
      description: 'Contpaqi Comercial is a widespread accounting and electronic invoicing solution in Mexico.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/contpaqicomercial.svg' },
      href: '/docs/framework/apis/contpaqicomercial',
    },
    {
      uid: 'discord',
      title: 'Discord',
      description: 'Discord is a voice, video and text communication service to talk and hang out with your friends and communities.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/discord.svg' },
      href: '/docs/framework/apis/discord',
    },
    {
      uid: 'facturama',
      title: 'Facturama',
      description: 'Facturama is a mexican billing and electronic invoicing solution.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/facturama.svg' },
      href: '/docs/framework/apis/facturama',
    },
    {
      uid: 'fathomanalytics',
      title: 'Fathom Analytics',
      description: 'Fathom Analytics provides simple, useful websites stats without tracking or storing personal data of your users..',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/fathomanalytics.svg' },
      href: '/docs/framework/apis/fathomanalytics',
    },
    {
      uid: 'github',
      title: 'Github',
      description: 'GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside millions of other developers.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/github.svg' },
      href: '/docs/framework/apis/github',
    },
    {
      uid: 'googleappsheet',
      title: 'Google AppSheet',
      description: 'AppSheet is a no-code development platform that allows you to build quick apps on Spreadsheets.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googleappsheet.svg' },
      href: '/docs/framework/apis/googleappsheet',
    },
    {
      uid: 'googledrive',
      title: 'Google Drive',
      description: 'Google Drive is a file storage and synchronization service developed by Google.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googledrive.svg' },
      href: '/docs/framework/apis/googledrive',
    },
    {
      uid: 'googlesheets',
      title: 'Google Sheets',
      description: 'Google Sheets is a spreadsheet program included as part of a free, web-based software office suite offered by Google within its Google Drive service.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googlesheets.svg' },
      href: '/docs/framework/apis/googlesheets',
    },
    {
      uid: 'holded',
      title: 'Holded',
      description: 'Holded is a business management software that helps you manage sales, accounting, inventory, and taxes in one place.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/holded.svg' },
      href: '/docs/framework/apis/holded',
    },
    {
      uid: 'hubspot',
      title: 'HubSpot',
      description: 'HubSpot offers a full stack of software for marketing, sales, and customer service, with a completely free CRM at its core.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/hubspot.svg' },
      href: '/docs/framework/apis/hubspot',
    },
    {
      uid: 'ipgeolocation',
      title: 'IP Geolocation',
      description: 'IP Geolocation API allows developers to get geolocation information for a given IP address. Data points returned by this GeoIP API include city, state, province, country, continent, latitude, longitude, region, timezone, current time, organization, ISP, local currency, and country flags.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/ipgeolocation.svg' },
      href: '/docs/framework/apis/ipgeolocation',
    },
    {
      uid: 'jsonplaceholder',
      title: 'JSONPlaceholder',
      description: 'JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/jsonplaceholder.svg' },
      href: '/docs/framework/apis/jsonplaceholder',
    },
    {
      uid: 'medium',
      title: 'Medium',
      description: 'Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/medium.svg' },
      href: '/docs/framework/apis/medium',
    },
    {
      uid: 'monday',
      title: 'Monday',
      description: 'monday.com is a work OS that powers teams to run processes, projects and workflows in one digital workspace.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/monday.svg' },
      href: '/docs/framework/apis/monday',
    },
    {
      uid: 'mongodbatlasdata',
      title: 'Mongodb Atlas Data',
      description: 'MongoDB Atlas Data API is a new managed API that allows developers to retrieve live data from their Atlas deployments without the need to write any client-side code.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mongodbatlasdata.svg' },
      href: '/docs/framework/apis/mongodbatlasdata',
    },
    {
      uid: 'netzo',
      title: 'Netzo',
      description: 'Netzo is the smartest way to build custom business software and automate workflows. Build your back-office with full-code control and without managing infrastructure.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/netzo.svg' },
      href: '/docs/framework/apis/netzo',
    },
    {
      uid: 'openai',
      title: 'OpenAI',
      description: 'OpenAI powers Chat GPT and DALL-E and lets you integrate the API into your apps.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/openai.svg' },
      href: '/docs/framework/apis/openai',
    },
    {
      uid: 'paddle',
      title: 'Paddle',
      description: 'Paddle is a SaaS platform for selling software and digital products online.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/paddle.svg' },
      href: '/docs/framework/apis/paddle',
    },
    {
      uid: 'pandadoc',
      title: 'Pandadoc',
      description: 'PandaDoc is an all-in-one software that streamlines your sales workflows. Create, send, track, and eSign client-facing documents designed to win more business.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/pandadoc.svg' },
      href: '/docs/framework/apis/pandadoc',
    },
    {
      uid: 'pipedrive',
      title: 'Pipedrive',
      description: 'Pipedrive is a CRM & pipeline management tool that helps you focus on actions that matter. By sales pros, for sales pros.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/pipedrive.svg' },
      href: '/docs/framework/apis/pipedrive',
    },
    {
      uid: 'rest',
      title: 'REST',
      description: 'REST is a generic API client for REST APIs. Use it to interact with any REST API.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/rest.svg' },
      href: '/docs/framework/apis/rest',
    },
    {
      uid: 'sendgrid',
      title: 'Sendgrid',
      description: 'SendGrid is a cloud-based SMTP provider that allows you to send email without having to maintain email servers.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/sendgrid.svg' },
      href: '/docs/framework/apis/sendgrid',
    },
    {
      uid: 'shopify',
      title: 'Shopify',
      description: 'Shopify is a complete commerce platform that lets you start, grow, and manage a business.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/shopify.svg' },
      href: '/docs/framework/apis/shopify',
    },
    {
      uid: 'stripe',
      title: 'Stripe',
      description: 'Stripe is a payments gateway and merchant account provider that allows you to accept credit card payments.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/stripe.svg' },
      href: '/docs/framework/apis/stripe',
    },
    {
      uid: 'whatsappbusiness',
      title: 'WhatsApp Business',
      description: 'Whatsapp Business is a messaging platform for businesses to communicate with their customers.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/whatsappbusiness.svg' },
      href: '/docs/framework/apis/whatsappbusiness',
    },
    {
      uid: 'wix',
      title: 'Wix',
      description: 'Wix is a cloud-based development platform that lets anyone create a visually acctractive websites and e-commerce stores without any coding skills.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/wix.svg' },
      href: '/docs/framework/apis/wix',
    },
    {
      uid: 'notion',
      title: 'Notion',
      description: 'Notion is an all-in-one workspace for your notes, tasks, wikis, and databases.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/notion.svg' },
      href: '/docs/framework/apis/notion',
    },
    {
      uid: 'mailchimpmarketing',
      title: 'Mailchimp Marketing',
      description: 'Mailchimp Marketing is an all-in-one marketing platform that helps you manage and talk to your clients, customers, and other interested parties.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mailchimp.svg' },
      href: '/docs/framework/apis/mailchimpmarketing',
    },
    {
      uid: 'mailgun',
      title: 'Mailgun',
      description: 'Mailgun is an email automation service provided by Rackspace.',
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mailgun.svg' },
      href: '/docs/framework/apis/mailgun',
    },
  ].sort((a, b) => a.uid.localeCompare(b.uid)),
  // categories: Analytics, CMS, CSS, Database, Devtools, Ecommerce, Extensions, Fonts, Images, Libraries, Monitoring, Payment, Performance, Request, Security, SEO, UI
  plugins: [
    {
      uid: 'appLayout',
      title: 'App Layout',
      description: 'Adds a global layout route from which all other routes inherit from.',
      labels: ['category:ui'],
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/appLayout.svg' },
      href: '/docs/framework/plugins/appLayout',
    },
    {
      uid: 'errorPages',
      title: 'Error Pages',
      description: 'Adds routes to render a custom error page for "404: Not Found" and "500: Server Error".',
      labels: ['category:ui'],
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/errorPages.svg' },
      href: '/docs/framework/plugins/errorPages',
    },
    {
      uid: 'unocss',
      title: 'UnoCSS',
      description: 'UnoCSS is an instant, on-demand atomic CSS engine. It generates atomic CSS classes on the fly based on the classes and attributes used in your project.',
      labels: ['category:library', 'category:ui'],
      display: { src: 'https://raw.githubusercontent.com/netzo/netzo/main/assets/plugins/unocss.svg' },
      href: '/docs/framework/plugins/unocss',
    },
  ].sort((a, b) => a.uid.localeCompare(b.uid)),
  components: [
    {
      uid: 'accordion',
      title: 'Accordion',
      description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
      display: { icon: 'i-mdi-view-sequential' },
      href: '/docs/framework/components/accordion',
    },
    {
      uid: 'alert',
      title: 'Alert',
      description: 'Displays a callout for user attention.',
      display: { icon: 'i-mdi-alert-circle' },
      href: '/docs/framework/components/alert',
    },
    {
      uid: 'alert-dialog',
      title: 'Alert Dialog',
      description: 'A modal dialog that interrupts the user with important content and expects a response.',
      display: { icon: 'i-mdi-alert-box' },
      href: '/docs/framework/components/alert-dialog',
    },
    {
      uid: 'aspect-ratio',
      title: 'Aspect Ratio',
      description: 'Displays content within a desired ratio.',
      display: { icon: 'i-mdi-aspect-ratio' },
      href: '/docs/framework/components/aspect-ratio',
    },
    {
      uid: 'avatar',
      title: 'Avatar',
      description: 'An image element with a fallback for representing the user.',
      display: { icon: 'i-mdi-account-circle' },
      href: '/docs/framework/components/avatar',
    },
    {
      uid: 'badge',
      title: 'Badge',
      description: 'Displays a badge or a component that looks like a badge.',
      display: { icon: 'i-mdi-label' },
      href: '/docs/framework/components/badge',
    },
    {
      uid: 'button',
      title: 'Button',
      description: 'Displays a button or a component that looks like a button.',
      display: { icon: 'i-mdi-button-pointer' },
      href: '/docs/framework/components/button',
    },
    {
      uid: 'calendar',
      title: 'Calendar',
      description: 'A date field component that allows users to enter and edit date.',
      display: { icon: 'i-mdi-calendar' },
      href: '/docs/framework/components/calendar',
    },
    {
      uid: 'card',
      title: 'Card',
      description: 'Displays a card with header, content, and footer.',
      display: { icon: 'i-mdi-card' },
      href: '/docs/framework/components/card',
    },
    {
      uid: 'checkbox',
      title: 'Checkbox',
      description: 'A control that allows the user to toggle between checked and not checked.',
      display: { icon: 'i-mdi-checkbox-marked' },
      href: '/docs/framework/components/checkbox',
    },
    {
      uid: 'collapsible',
      title: 'Collapsible',
      description: 'An interactive component which expands/collapses a panel.',
      display: { icon: 'i-mdi-arrow-collapse-vertical' },
      href: '/docs/framework/components/collapsible',
    },
    {
      uid: 'combobox',
      title: 'Combobox',
      description: 'Autocomplete input and command palette with a list of suggestions.',
      display: { icon: 'i-mdi-form-select' },
      href: '/docs/framework/components/combobox',
    },
    {
      uid: 'command',
      title: 'Command',
      description: 'Fast, composable, unstyled command menu for React.',
      display: { icon: 'i-mdi-apple-keyboard-command' },
      href: '/docs/framework/components/command',
    },
    {
      uid: 'context-menu',
      title: 'Context Menu',
      description: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
      display: { icon: 'i-mdi-form-dropdown' },
      href: '/docs/framework/components/context-menu',
    },
    {
      uid: 'data-table',
      title: 'Data Table',
      description: 'Powerful table and datagrids built using TanStack Table.',
      display: { icon: 'i-mdi-table' },
      href: '/docs/framework/components/data-table',
    },
    {
      uid: 'date-picker',
      title: 'Date Picker',
      description: 'A date picker component with range and presets.',
      display: { icon: 'i-mdi-calendar' },
      href: '/docs/framework/components/date-picker',
    },
    {
      uid: 'dialog',
      title: 'Dialog',
      description: 'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
      display: { icon: 'i-mdi-window-maximize' },
      href: '/docs/framework/components/dialog',
    },
    {
      uid: 'dropdown-menu',
      title: 'Dropdown Menu',
      description: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button.',
      display: { icon: 'i-mdi-form-dropdown' },
      href: '/docs/framework/components/dropdown-menu',
    },
    {
      uid: 'form',
      title: 'Form',
      description: 'Building forms with React Hook Form and Zod.',
      display: { icon: 'i-mdi-view-headline' },
      href: '/docs/framework/components/form',
    },
    {
      uid: 'hover-card',
      title: 'Hover Card',
      description: 'For sighted users to preview content available behind a link.',
      display: { icon: 'i-mdi-card-search' },
      href: '/docs/framework/components/hover-card',
    },
    {
      uid: 'input',
      title: 'Input',
      description: 'Displays a form input field or a component that looks like an input field.',
      display: { icon: 'i-mdi-form-textbox' },
      href: '/docs/framework/components/input',
    },
    {
      uid: 'label',
      title: 'Label',
      description: 'Renders an accessible label associated with controls.',
      display: { icon: 'i-mdi-label' },
      href: '/docs/framework/components/label',
    },
    {
      uid: 'menubar',
      title: 'Menubar',
      description: 'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',
      display: { icon: 'i-mdi-button-pointer' },
      href: '/docs/framework/components/menubar',
    },
    {
      uid: 'navigation-menu',
      title: 'Navigation Menu',
      description: 'A collection of links for navigating websites.',
      display: { icon: 'i-mdi-view-split-vertical' },
      href: '/docs/framework/components/navigation-menu',
    },
    {
      uid: 'popover',
      title: 'Popover',
      description: 'Displays rich content in a portal, triggered by a button.',
      display: { icon: 'i-mdi-picture-in-picture-bottom-right' },
      href: '/docs/framework/components/popover',
    },
    {
      uid: 'progress',
      title: 'Progress',
      description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      display: { icon: 'i-carbon-progress-bar' },
      href: '/docs/framework/components/progress',
    },
    {
      uid: 'radio-group',
      title: 'Radio Group',
      description: 'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
      display: { icon: 'i-mdi-radiobox-marked' },
      href: '/docs/framework/components/radio-group',
    },
    {
      uid: 'scroll-area',
      title: 'Scroll Area',
      description: 'Augments native scroll functionality for custom, cross-browser styling.',
      display: { icon: 'i-mdi-cursor-move' },
      href: '/docs/framework/components/scroll-area',
    },
    {
      uid: 'select',
      title: 'Select',
      description: 'Displays a list of options for the user to pick from—triggered by a button.',
      display: { icon: 'i-mdi-form-select' },
      href: '/docs/framework/components/select',
    },
    {
      uid: 'separator',
      title: 'Separator',
      description: 'Visually or semantically separates content.',
      display: { icon: 'i-mdi-format-vertical-align-center' },
      href: '/docs/framework/components/separator',
    },
    {
      uid: 'sheet',
      title: 'Sheet',
      description: 'Extends the Dialog component to display content that complements the main content of the screen.',
      display: { icon: 'i-mdi-view-split-vertical' },
      href: '/docs/framework/components/sheet',
    },
    {
      uid: 'skeleton',
      title: 'Skeleton',
      description: 'Use to show a placeholder while content is loading.',
      display: { icon: 'i-mdi-view-compact' },
      href: '/docs/framework/components/skeleton',
    },
    {
      uid: 'slider',
      title: 'Slider',
      description: 'An input where the user selects a value from within a given range.',
      display: { icon: 'i-mdi-ray-vertex' },
      href: '/docs/framework/components/slider',
    },
    {
      uid: 'switch',
      title: 'Switch',
      description: 'A control that allows the user to toggle between checked and not checked.',
      display: { icon: 'i-mdi-toggle-switch' },
      href: '/docs/framework/components/switch',
    },
    {
      uid: 'table',
      title: 'Table',
      description: 'A responsive table component.',
      display: { icon: 'i-mdi-table' },
      href: '/docs/framework/components/table',
    },
    {
      uid: 'tabs',
      title: 'Tabs',
      description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      display: { icon: 'i-mdi-view-gallery-outline' },
      href: '/docs/framework/components/tabs',
    },
    {
      uid: 'textarea',
      title: 'Textarea',
      description: 'Displays a form textarea or a component that looks like a textarea.',
      display: { icon: 'i-mdi-form-textarea' },
      href: '/docs/framework/components/textarea',
    },
    {
      uid: 'toast',
      title: 'Toast',
      description: 'A succinct message that is displayed temporarily.',
      display: { icon: 'i-mdi-tooltip-text' },
      href: '/docs/framework/components/toast',
    },
    {
      uid: 'toggle',
      title: 'Toggle',
      description: 'A two-state button that can be either on or off.',
      display: { icon: 'i-mdi-power-standby' },
      href: '/docs/framework/components/toggle',
    },
    {
      uid: 'tooltip',
      title: 'Tooltip',
      description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      display: { icon: 'i-mdi-tooltip' },
      href: '/docs/framework/components/tooltip',
    },
    {
      uid: 'typography',
      title: 'Typography',
      description: 'Styles for headings, paragraphs, lists, etc.',
      display: { icon: 'i-mdi-format-text' },
      href: '/docs/framework/components/typography',
    },
  ].sort((a, b) => a.uid.localeCompare(b.uid)),
  templates: [
    {
      uid: 'app-terms-and-privacy-acceptance-monitor',
      title: 'Terms and Privacy Policy Acceptance Monitor',
      description: 'Monitor and track the acceptance of terms and privacy policies, providing insights and analytics based on the dataset, either from your Auth0 or your own database. Trigger email reminders to users who have not accepted the terms and privacy policies.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-terms-and-privacy-acceptance-monitor/icon.svg',
      },
    },
    {
      uid: 'app-know-your-customer-dashboard',
      title: 'Know-Your-Customer Dashboard',
      description: 'Consolidate customer data from any SaaS API, database or spreadsheet for a holistic view of the customer. Enhance team productivity with all the required informationn in one place, while protecting sensitive data from unauthorized individuals.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-know-your-customer-dashboard/icon.svg',
      },
    },
    {
      uid: 'app-custom-crm-mongodb',
      title: 'Custom CRM on MongoDB',
      description: 'An adaptable CRM solution designed to cater to the unique requirements of your marketing or sales team with a customizable API interface endpoints for advanced functionality, prospecting and AI integration.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-custom-crm-mongodb/icon.svg',
      },
    },
    {
      uid: 'app-custom-crm-googlesheets',
      title: 'Custom CRM on Google Sheets',
      description: 'An adaptable CRM solution designed to cater to the unique requirements of your marketing or sales team with a customizable API interface endpoints for advanced functionality, prospecting and AI integration.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-custom-crm-googlesheets/icon.svg',
      },
    },
    {
      uid: 'app-employee-directory',
      title: 'Employee Directory',
      description: 'A web app to quickly find employee data, skills and contact info in a convenient easily accessible interface. This app simplifies matching employees to tasks and projects. Employee data may be stored in any HR system or database and simply streamed, when required.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-employee-directory/icon.png',
      },
    },
    {
      uid: 'app-dynamic-landing-page-generator',
      title: 'Dynamic Landing Page Generator',
      description: 'A dynamic landing page generator with perfect SEO score, multilanguage and multi buyer persona support from a single JSON file.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-dynamic-landing-page-generator/icon.svg',
      },
    },
    {
      uid: 'app-cms-github',
      title: 'Custom CMS on GitHub',
      description: 'An intuitive content management system (CMS) to easily store and manage digital assets such as images, files, videos and audio in different formats with version control and web hosting via Github.',
      display: {
        src: 'https://netzo.io/images/home/admin-panels.svg',
      },
    },
    {
      uid: 'app-app-launcher',
      title: 'App Launcher',
      description: 'Quick links for important apps and services',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-app-launcher/icon.svg',
      },
    },
    {
      uid: 'app-sales-dashboard',
      title: 'Sales Dashboard',
      description: 'A sales dashboard to track performance of sales teams in real-time, and provides a variety of metrics to help make informed decisions.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-sales-dashboard/icon.svg',
      },
    },
    {
      uid: 'app-statuspage',
      title: 'Statuspage',
      description: 'A status page to track the \'up\', \'down\' and \'maintenance\' status of (multiple) services over time.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-statuspage/icon.svg',
      },
    },
    {
      uid: 'app-gdpr-data-export-utility',
      title: 'GDPR Data Export Utility',
      description: 'A web portal to easily retrieve data subject personal information from multiple sources and export in a standard format (PDF, JSON, CSV), to comply with GDPR requirements. Alternatively, send via email.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/app-gdpr-data-export-utility/icon.png',
      },
    },
    {
      uid: 'api-department-metrics',
      title: 'Department Metrics API',
      description: 'Consolidate department metrics from multiple APIs and standardize, cross-check and cross-create KPIs for any departments, such as sales, marketing, operations, and more. Use you internal API to easily build Business Intelligence dashboards, reports and enhance intradepartment communications.',
      display: {
        src: 'https://netzo.io/images/home/apis.svg',
      },
    },
    {
      uid: 'api-internal-operations',
      title: 'Internal Operations API',
      description: 'Build custom business logic, operations and workflows under a single api. Execute simple to complex operations, such as sending emails, provisioning users, provisioning infrastructure, and much more via your webhooks and API calls from anywhere.',
      display: {
        src: 'https://netzo.io/images/home/apis.svg',
      },
    },
    {
      uid: 'api-iot-cloud-gateway',
      title: 'IoT Cloud Gateway API',
      description: 'An IoT cloud gateway API to collect, capture, process and route IoT field device data to your database or cloud service.',
      display: {
        src: 'https://netzo.io/images/home/apis.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-hubspot-resource',
      title: 'Capture Webhook data to HubSpot resource',
      description: 'This workflow allows you to seamlessly capture Webhook data and integrate it into your HubSpot resource, providing you with a centralized platform to manage and analyze your data effectively. By automating this process, it eliminates the need for manual data entry, saving you time and ensuring accurate data transfer. With complete control over the source code, you have the flexibility to customize and tailor the workflow to perfectly fit your unique business needs, allowing for easy adaptation and extension to any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-hubspot-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-saphana-resource',
      title: 'Capture Webhook data to SAP Hana resource',
      description: 'This workflow enables seamless integration between webhooks and SAP Hana, allowing for real-time data capture and synchronization. By automating the process, it eliminates the need for manual data entry, reducing errors and saving time. With complete control over the source code, users can easily customize and tailor the workflow to their specific needs, ensuring a perfect fit for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-saphana-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-activecampaign-contacts-and-companies',
      title: 'Send Apollo leads to ActiveCampaign contacts and companies',
      description: 'This workflow seamlessly integrates Apollo leads with ActiveCampaign contacts and companies, streamlining the process of managing and nurturing leads. It eliminates the need for manual data entry and ensures that all relevant information is automatically synced, saving time and reducing the risk of errors. With complete control over the source code, users can customize and tailor the workflow to perfectly align with their unique business requirements, enabling them to adapt, extend, and fit any use case effortlessly.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-activecampaign-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-brevo-contacts-and-companies',
      title: 'Send Apollo leads to Brevo contacts and companies',
      description: 'This workflow seamlessly transfers leads generated from Apollo to Brevo contacts and companies, streamlining the process of managing and nurturing potential customers. By automating this data transfer, it eliminates the need for manual entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows users to customize and tailor the workflow to their specific needs, ensuring it perfectly aligns with their unique use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-brevo-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-hubspot-contacts-and-companies',
      title: 'Send Apollo leads to HubSpot contacts and companies',
      description: 'This workflow seamlessly integrates Apollo leads with HubSpot contacts and companies, ensuring a smooth transfer of valuable customer information. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. With complete control over the source code, users can easily customize and tailor the workflow to their specific needs, making it a versatile solution for any business use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-hubspot-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-holded-contacts',
      title: 'Send Apollo leads to Holded contacts',
      description: 'This workflow seamlessly integrates Apollo leads with Holded contacts, ensuring a smooth transfer of valuable customer information. By automating this process, businesses can save time and effort, eliminating the need for manual data entry and reducing the risk of errors. With complete control over the source code, businesses can easily customize and tailor the workflow to their specific needs, allowing for maximum adaptability and flexibility.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-holded-contacts/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-hubspot-contacts-and-companies',
      title: 'Send Dripify leads to HubSpot contacts and companies',
      description: 'This workflow seamlessly integrates Dripify leads with HubSpot contacts and companies, ensuring a smooth transfer of valuable customer data. By automating this process, businesses can save time and effort, while also gaining a comprehensive view of their leads and customers in one centralized platform. Additionally, having complete control over the source code allows for easy customization and adaptation to meet specific business needs, providing a flexible solution for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-hubspot-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-holded-contacts',
      title: 'Send Dripify leads to Holded contacts',
      description: 'This workflow seamlessly integrates Dripify leads with Holded contacts, ensuring a smooth transfer of valuable customer information. By automating this process, businesses can save time and effort, while maintaining complete control over the source code to customize and optimize the workflow according to their specific needs. This integration eliminates the hassle of manual data entry and allows for a more efficient and tailored approach to managing customer relationships.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-holded-contacts/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-saphana-contacts-and-companies',
      title: 'Send Dripify leads to SAP Hana contacts and companies',
      description: 'This workflow seamlessly integrates Dripify leads with SAP Hana contacts and companies, ensuring a smooth transfer of data between the two platforms. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows for customization and flexibility, enabling users to tailor the workflow to their specific needs and requirements.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-saphana-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-pipedrive-persons',
      title: 'Send Dripify leads to Pipedrive persons',
      description: 'This workflow seamlessly transfers leads from Dripify to Pipedrive, ensuring a smooth transition of potential customers into your contact and company database. By automating this process, it eliminates the need for manual data entry, saving you time and reducing the risk of errors. With complete control over the source code, you have the flexibility to customize and tailor the workflow to perfectly align with your unique business needs, allowing for effortless adaptation and extension to any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-pipedrive-persons/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-saphana-contacts-and-companies',
      title: 'Send Apollo leads to SAP Hana contacts and companies',
      description: 'This workflow seamlessly integrates Apollo leads with SAP Hana contacts and companies, enabling efficient data transfer and synchronization. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code empowers users to customize and tailor the workflow to their specific needs, ensuring a perfect fit for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-saphana-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-activecampaign-contacts-and-companies',
      title: 'Send Dripify leads to ActiveCampaign contacts and companies',
      description: 'This workflow seamlessly integrates Dripify leads with ActiveCampaign contacts and companies, providing a streamlined process for managing customer data. By automating the transfer of information, it eliminates the need for manual data entry and ensures accurate and up-to-date records, saving time and reducing errors. With complete control over the source code, users have the flexibility to customize and tailor the workflow to their specific needs, making it a versatile solution for any business or use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-activecampaign-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-brevo-contacts-and-companies',
      title: 'Send Meet Alfred leads to Brevo contacts and companies',
      description: 'This workflow seamlessly transfers leads generated through Meet Alfred to Brevo contacts and companies, streamlining the lead management process. By automating this data transfer, it eliminates the need for manual entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows users to customize and tailor the workflow to their specific needs, ensuring it perfectly fits any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-brevo-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-hubspot-contacts-and-companies',
      title: 'Send Waalaxy leads to HubSpot contacts and companies',
      description: 'This workflow seamlessly integrates Waalaxy leads with HubSpot contacts and companies, eliminating the need for manual data entry and ensuring accurate and up-to-date information. By automating this process, users can save time and effort, allowing them to focus on nurturing leads and building meaningful relationships. Additionally, having complete control over the source code empowers users to customize and tailor the workflow to their specific needs, ensuring a perfect fit for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-hubspot-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-holded-contacts',
      title: 'Send Meet Alfred leads to Holded contacts',
      description: 'This workflow seamlessly integrates Meet Alfred leads with Holded contacts, streamlining the lead management process. It eliminates the need for manual data entry, saving time and reducing the risk of errors. With complete control over the source code, users can easily customize and tailor the workflow to their specific needs, ensuring a perfect fit for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-holded-contacts/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-activecampaign-contacts-and-companies',
      title: 'Send Meet Alfred leads to ActiveCampaign contacts and companies',
      description: 'This workflow seamlessly integrates Meet Alfred leads with ActiveCampaign contacts and companies, providing a streamlined process for managing and nurturing potential customers. By automating the transfer of leads, it eliminates the need for manual data entry and ensures that no valuable prospects are missed. Additionally, the complete control over the source code empowers users to customize and tailor the workflow to their specific needs, allowing for maximum adaptability and flexibility.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-activecampaign-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-pipedrive-persons',
      title: 'Send Meet Alfred leads to Pipedrive persons',
      description: 'This workflow seamlessly integrates Meet Alfred leads with Pipedrive persons, ensuring a smooth transfer of valuable information. It eliminates the hassle of manually inputting data, saving time and effort for sales teams. With complete control over the source code, users can easily customize and tailor the workflow to perfectly align with their unique requirements and business processes.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-pipedrive-persons/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-hubspot-contacts-and-companies',
      title: 'Send Meet Alfred leads to HubSpot contacts and companies',
      description: 'This workflow seamlessly integrates Meet Alfred leads with HubSpot contacts and companies, providing a streamlined process for managing and nurturing potential leads. By automating the transfer of data, it eliminates the need for manual entry and ensures accurate and up-to-date information, saving time and reducing the risk of errors. With complete control over the source code, users have the flexibility to customize and tailor the workflow to their specific needs, making it a versatile solution for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-hubspot-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-saphana-contacts-and-companies',
      title: 'Send Waalaxy leads to SAP Hana contacts and companies',
      description: 'This workflow seamlessly integrates Waalaxy leads with SAP Hana contacts and companies, eliminating the need for manual data entry and ensuring accurate and up-to-date information. By automating this process, users can save time and effort while maintaining a comprehensive and synchronized database. Additionally, having complete control over the source code allows for easy customization and tailoring to specific business needs, ensuring a perfect fit for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-saphana-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-meet-alfred-leads-to-saphana-contacts-and-companies',
      title: 'Send Meet Alfred leads to SAP Hana contacts and companies',
      description: 'This workflow seamlessly integrates Meet Alfred leads with SAP Hana contacts and companies, ensuring a smooth transfer of data between the two platforms. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows users to customize and tailor the workflow to their specific needs, making it adaptable and flexible for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-meet-alfred-leads-to-saphana-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-sync-pipedrive-contacts-and-companies-with-holded-contacts-and-companies',
      title: 'Sync Pipedrive persons with Holded contacts',
      description: 'This workflow seamlessly syncs Pipedrive persons with Holded contacts, ensuring that all customer information remains up-to-date across both platforms. By automating this process, it eliminates the need for manual data entry and reduces the risk of errors or inconsistencies. With complete control over the source code, users can easily customize and tailor the workflow to their specific needs, allowing for a truly adaptable and flexible solution.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-sync-pipedrive-contacts-and-companies-with-holded-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-activecampaign-resource',
      title: 'Capture Webhook data to ActiveCampaign resource',
      description: 'This workflow allows you to seamlessly capture Webhook data and integrate it into your ActiveCampaign resource, providing you with a streamlined process for managing and organizing your customer data. By automating this task, you can save time and effort, ensuring that no valuable information is missed or lost. Additionally, with complete control over the source code, you have the flexibility to customize and tailor the workflow to perfectly fit your specific needs and requirements.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-activecampaign-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-brevo-resource',
      title: 'Capture Webhook data to Brevo resource',
      description: 'This workflow enables seamless integration of webhook data into Brevo resource, providing users with real-time updates and eliminating the need for manual data entry. It resolves the pain point of time-consuming and error-prone data transfer, allowing users to focus on more important tasks. With complete control over the source code, users can easily customize and tailor the workflow to perfectly fit their specific use case, ensuring maximum efficiency and flexibility.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-brevo-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-holded-resource',
      title: 'Capture Webhook data to Holded resource',
      description: 'This workflow allows you to seamlessly capture Webhook data and store it in your Holded resource, providing you with real-time updates and eliminating the need for manual data entry. By automating this process, you can save time and ensure accurate data synchronization, enabling you to focus on more important tasks. Additionally, having complete control over the source code empowers you to customize and tailor the workflow to perfectly fit your specific needs and requirements.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-holded-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-capture-webhook-data-to-pipedrive-resource',
      title: 'Capture Webhook data to Pipedrive resource',
      description: 'This workflow allows you to seamlessly capture incoming Webhook data and automatically transfer it to your Pipedrive resource. It eliminates the hassle of manually inputting data, saving you time and ensuring accurate information in your CRM system. With complete control over the source code, you can easily customize and tailor the workflow to perfectly fit your specific needs and use cases.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-capture-webhook-data-to-pipedrive-resource/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies',
      title: 'Send Waalaxy leads to ActiveCampaign contacts and companies',
      description: 'This workflow seamlessly integrates Waalaxy leads with ActiveCampaign contacts and companies, eliminating the need for manual data entry and ensuring accurate and up-to-date information. By automating this process, users can save time and effort, allowing them to focus on nurturing leads and building stronger customer relationships. Additionally, with complete control over the source code, users have the flexibility to customize and tailor the workflow to their specific needs, ensuring it fits any use case perfectly.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-pipedrive-persons',
      title: 'Send Waalaxy leads to Pipedrive persons',
      description: 'This workflow seamlessly transfers leads generated through Waalaxy to Pipedrive, ensuring a smooth transition from prospecting to customer relationship management. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows users to customize and tailor the workflow to their specific needs, making it adaptable and versatile for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-pipedrive-persons/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-holded-contacts',
      title: 'Send Waalaxy leads to Holded contacts',
      description: 'This workflow seamlessly integrates Waalaxy leads with Holded contacts, eliminating the need for manual data entry and ensuring accurate and up-to-date information. By automating this process, users can save time and effort, allowing them to focus on more important tasks and improving overall productivity. Additionally, with complete control over the source code, users have the flexibility to customize and tailor the workflow to their specific needs, making it a versatile solution for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-holded-contacts/icon.svg',
      },
    },
    {
      uid: 'workflow-send-waalaxy-leads-to-brevo-contacts-and-companies',
      title: 'Send Waalaxy leads to Brevo contacts and companies',
      description: 'This workflow seamlessly transfers leads generated through Waalaxy to Brevo\'s contacts and companies, streamlining the process of managing and nurturing potential customers. By automating this data transfer, it eliminates the need for manual entry, saving time and reducing the risk of errors. Additionally, users have complete control over the source code, allowing them to customize and tailor the workflow to their specific needs, ensuring it fits any use case perfectly.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-waalaxy-leads-to-brevo-contacts-and-companies/icon.svg',
      },
    },
    {
      uid: 'workflow-send-apollo-leads-to-pipedrive-persons',
      title: 'Send Apollo leads to Pipedrive persons',
      description: 'This workflow seamlessly integrates Apollo leads with Pipedrive persons, eliminating the need for manual data entry and ensuring accurate and up-to-date information. By automating this process, users can save valuable time and effort, allowing them to focus on nurturing leads and closing deals. Additionally, with complete control over the source code, users have the flexibility to customize and tailor the workflow to their specific needs, making it a versatile solution for any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-apollo-leads-to-pipedrive-persons/icon.svg',
      },
    },
    {
      uid: 'workflow-send-dripify-leads-to-brevo-contacts-and-companies',
      title: 'Send Dripify leads to Brevo contacts and companies',
      description: 'This workflow seamlessly transfers leads generated through Dripify to Brevo\'s contact and company database, ensuring a smooth integration between the two platforms. By automating this process, it eliminates the need for manual data entry, saving time and reducing the risk of errors. Additionally, having complete control over the source code allows users to customize and tailor the workflow to their specific needs, ensuring it perfectly fits any use case.',
      display: {
        src: 'https://raw.githubusercontent.com/netzo/netzo/main/www/src/public/use-cases/workflow-send-dripify-leads-to-brevo-contacts-and-companies/icon.svg',
      },
    },
  ],
}
