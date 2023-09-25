import { legalES } from '../.vitepress/config.sidebar'

const contactanos = '<u><a href="https://calendly.com/netzo-arturoromero">Ponte en contacto</a></u>'

export default {
  home: {
    hero: {
      topic: 'Diseñado para Empresas Modernas',
      title: 'La manera más inteligente de crear software empresarial a medida',
      description: 'Crea software empresarial a medida fácilmente, para centralizar información, integrar sistemas y automatizar flujos de trabajo. Crea tu back-office con control, escalabilidad y adaptabilidad de crecimiento.',
      buttons: [
        {
          type: 'lets-talk',
          text: 'Contáctanos',
        },
        // {
        //   type: 'video-scroll',
        //   text: 'Ver Intro de 1 min',
        //   href: '#section-what',
        // },
      ],
      image: {
        alt: 'Netzo: Crea y comparte aplicaciones back-office más rápido',
        src: '/images/home/hero.svg',
      },
      items: [
        {
          icon: 'i-mdi-check-circle-outline',
          title: 'Centrado en el desarrollador',
        },
        {
          icon: 'i-mdi-check-circle-outline',
          title: 'De idea a produccion en horas',
        },
        {
          icon: 'i-mdi-check-circle-outline',
          title: 'Sin vendor lock-in',
        },
        {
          icon: 'i-mdi-check-circle-outline',
          title: 'Código abierto',
        },
      ],
    },
    sectionWhat: {
      topic: '¿Qué es Netzo?',
      title: 'La plataforma integral para optimizar operaciones con software empresarial a medida',
      items: [
        {
          icon: 'i-mdi-rocket',
          title: 'Usa la tecnología como habilitador ',
          description: 'Crea herramientas que evolucionen con tu negocio, maximizando la eficiencia.',
        },
        {
          icon: 'i-mdi-clock-fast',
          title: 'Del concepto a la producción en horas, no en meses',
          description: 'Soluciones 10 veces más rápido y enfocate totalmente en su lógica de negocio.',
        },
        {
          icon: 'i-mdi-arrow-expand',
          title: 'Control total, sin dependencia de proveedores',
          description: 'Se el dueño de las herramientas que te dan la ventaja competitiva.',
        },
        {
          icon: 'i-mdi-security',
          title: 'Seguridad incorporada y completa visibilidad',
          description: 'Reduce riesgos y fugas de información con controles de seguridad integrados.',
        },
      ],
      buttons: [
        {
          type: 'lets-talk',
          text: 'Contáctanos',
        },
      ],
      image: {
        alt: 'Netzo - La plataforma de desarrollo para apps empresariales a medida',
        src: '/images/home/netzo.svg',
        class: 'mb-8 !h-600px',
        // subtitles: [
        //   {
        //     label: 'English',
        //     kind: 'subtitles',
        //     srclang: 'en',
        //     src: '/netzo-intro-en.vtt',
        //     default: true,
        //   },
        //   {
        //     label: 'Español',
        //     kind: 'subtitles',
        //     srclang: 'es',
        //     src: '/netzo-intro-es.vtt',
        //     default: false,
        //   },
        // ],
      },
    },
    sectionWhyNetzo: {
      topic: '¿Por qué Netzo?',
      title: 'Mejores soluciones diseñadas para tus procesos únicos',
      items: [
        {
          icon: 'i-mdi-head-lightbulb-outline',
          title: 'Aumenta tu ventaja competitiva ',
          description: 'Innova más rápido con menos esfuerzo y gana ventaja competitiva sobre tus competidores.',
        },
        {
          icon: 'i-bx-timer',
          title: 'Gana velocidad iterativa ',
          description: 'Itera con velocidad y objetivos claros entre tus desarrolladores y estrategia de negocio.',
        },
        {
          icon: 'i-mdi-account-group-outline',
          title: 'Colaboración y adopción interdepartamental ',
          description: 'Colabora y fomenta la retroalimentación entre equipos y desarrolladores e itera continuamente.',
        },
        {
          icon: 'i-tabler-packages',
          title: 'Orchestra tus datos',
          description: 'Centraliza los datos de todos tus sistemas, y gana visibilidad cruzando cuaquier dato con otro.',
        },
        {
          icon: 'i-ic-baseline-hub',
          title: 'Centraliza tus operaciones',
          description: 'Obten visibilidad sobre tus operaciones y supervisa de cerca tus procesos críticos.',
        },
        {
          icon: 'i-mdi-lock-open-variant-outline',
          title: 'Elimina tu dependencia a proveedores',
          description: 'Vuelvete dueño de tus soluciones y evita el resago tecnológico.',
        },
        {
          icon: 'i-mdi-security',
          title: 'Elimina riesgos de seguridad',
          description: 'Manten la seguridad de la información con controles incorporados y capacidades de auditoría de código manteniendo una escalabilidad total.',
        },
        {
          icon: 'i-emojione-flag-for-european-union',
          title: 'Soporte local y cumplimiento RGPD',
          description: 'Base en Madrid e impulsados por la seguridad por diseño',
        },
      ],
    },
    sectionWhatCanYouBuild: {
      topic: '¿Qué puedes crear?',
      title: 'Soluciones adaptables que tus equipos verdaderamente necesitan',
      description: 'Crea soluciones de software críticas para la empresa rápidamente y por una fracción de los costes tradicionales. Crea paneles de inteligencia empresarial, mejore las operaciones con cuadros de mando y flujos de trabajo automatizados, implementa tecnologías de IA en tus procesos existentes y estructura datos para habilitar un intercambio de información fluido, todo desde un solo lugar.',
      items: [
        {
          uid: 'app-know-your-customer-dashboard',
          title: 'Tablero de Conoce-a-tu-Cliente',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/templates/_requested/app-know-your-customer-dashboard/icon.svg',
          },
        },
        {
          uid: 'app-sales-dashboard',
          title: 'Tablero Consolidado de Ventas',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/templates/app-sales-dashboard/icon.svg',
          },
        },
        {
          uid: 'workflow-capture-webhook-data-to-hubspot-resource',
          title: 'Captura de Datos de Webhook a Recurso de HubSpot',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/templates/_requested/workflow-capture-webhook-data-to-hubspot-resource/icon.svg',
          },
        },
        {
          uid: 'api-department-metrics',
          title: 'API de Métricas del Departamento',
          image: {
            src: '/images/home/apis.svg',
          },
        },
        {
          uid: 'app-gdpr-data-export-utility',
          title: 'Utilidad de Exportación de Datos GDPR',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/templates/_requested/app-gdpr-data-export-utility/icon.png',
          },
        },
        {
          uid: 'workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies',
          title: 'Enviar prospectos de Waalaxy a contactos y empresas de ActiveCampaign',
          image: {
            src: 'https://raw.githubusercontent.com/netzo/netzo/main/templates/workflow-send-waalaxy-leads-to-activecampaign-contacts-and-companies/icon.svg',
          },
        },
      ],
      buttons: [
        {
          variant: 'secondary',
          text: 'Ver más',
          href: '/docs/templates/apps',
        },
      ],
    },
    sectionWhy: {
      topic: '¿Por qué usar Netzo?',
      title: 'La ineficiencia mata a las empresas',
      items: [
        {
          title: 'Pérdida de ingresos y crecimiento lento',
          description: 'Las ineficiencias les cuestan a las empresas hasta un 30% de sus ingresos y limitan el potencial de crecimiento.',
        },
        {
          title: 'Oportunidades perdidas',
          description: 'Las ideas innovadoras quedan sepultadas en el backlog, lo que lleva a oportunidades perdidas para el crecimiento y la mejora.',
        },
        {
          title: 'Incapacidad para adaptarse y escalar',
          description: 'Las empresas lentas luchan por adaptarse a las cambiantes condiciones del mercado y arriesgan su ventaja competitiva.',
        },
      ],
      buttons: [
        {
          type: 'learn-more',
          text: 'Más información',
          href: '/es/netzo/why-use-netzo',
        },
      ],
    },
    sectionHow: {
      topic: '¿Cómo funciona?',
      title: 'La versatilidad del código sin los dolores de cabeza',
      description: 'Di adiós a los desarrollos costosos, tediosos e inmantenibles. Disfruta todos los beneficios de desarrollar con código sin los grandes esfuerzos ni requisitos de mantenimiento al crear tu back-office.',
      items: [
        {
          topic: 'Programa',
          title: 'Máxima flexibilidad para los desarrolladores via <code>JS</code>/<code>TS</code>',
          description: 'Crea aplicaciones back-office con confianza y flexibilidad. Construye interfaces con <code>JSX</code>/<code>TSX</code>, crea APIs internas (HTTP) y automatiza flujos de trabajos con control total sobre tus scripts.',
          image: {
            alt: 'Cree cualquier cosa en JS/TS',
            src: '/images/home/1-code.svg',
            isGIF: true,
          },
          items: [
            {
              icon: 'i-mdi-code-braces',
              title: 'Programa en línea o localmente a través del CLI de Netzo',
            },
            {
              icon: 'i-mdi-bug',
              title: 'Depura rápidamente con registros, métricas y seguimiento de errores',
            },
            {
              icon: 'i-mdi-api',
              title: 'Integra cualquier API, base de datos o importa tus bibliotecas favoritas a través de URLs',
            },
          ],
        },
        {
          topic: 'Despliega',
          title: 'Entrega soluciones más rápido e itera a tu ritmo',
          description: 'Implementa, realiza cambios y da mantenimiento a tus apps con facilidad. Elimina cargas innecesarias y concéntrate en lo que realmente importa: impulsar tu negocio.',
          image: {
            alt: 'Implemente al instante sin el DevOps',
            src: '/images/home/2-deploy.svg',
            isGIF: true,
          },
          items: [
            {
              icon: 'i-ic-baseline-hub',
              title: 'Centraliza los esfuerzos del equipo, impulsa la adopción y evita el trabajo duplicado',
            },
            {
              icon: 'i-mdi-git',
              title: 'Desarrollo continuo, control de versiones y soporte de entorno',
            },
            {
              icon: 'i-mdi-finance',
              title: 'Analíticas incorporadas para información en tiempo real',
            },
          ],
        },
        {
          topic: 'Comparte',
          title: 'Potencia la colaboración y aumenta la productividad',
          description: 'Facilita la colaboración y fomenta los ciclos de retroalimentación entre tus equipos y desarrolladores. Crea y comparte apps personalizadas con confianza y sin necesidad de equipos técnicos extensos.',
          image: {
            alt: 'Potencia la colaboración y aumenta la productividad',
            src: '/images/home/3-share.svg',
            isGIF: true,
          },
          items: [
            {
              icon: 'i-mdi-share-variant',
              title: 'Comparte al instante y de forma segura con grupos y permisos',
            },
            {
              icon: 'i-mdi-police-badge',
              title: 'Registros de auditoría para cumplimiento, seguridad e información sobre el uso',
            },
            {
              icon: 'i-ic-outline-feedback',
              title: 'Adápta tus apps más rápido con solicitudes de funcionalidad y retroalimentación de los usuarios',
            },
          ],
        },
      ],
    },
    sectionHowIsNetzoDifferentForDevelopers: {
      topic: 'Centrado en el desarrollador',
      title: 'Superpoderes para los desarrolladores',
      items: [
        {
          icon: 'i-mdi-view-dashboard-outline',
          description: '<strong style="color: #0080ff"><a href="/docs/templates/apps">Plantillas</a></strong> para comenzar implementaciones a medida en segundos',
        },
        {
          icon: 'i-mdi-hexagon-multiple',
          description: '<strong style="color: #0080ff"><a href="/docs/netzo/apis">Integraciones</a></strong> a cientos de APIS sin necediad de leer su documentacion',
        },
        {
          icon: 'i-mdi-widgets',
          description: '<strong style="color: #0080ff"><a href="/docs/netzo/ui/components">Componentes UI</a></strong>, <strong style="color: #0080ff"><a href="/docs/netzo/ui/plugins">Plugins</a></strong> y <strong style="color: #0080ff"><a href="/docs/netzo/ui/composables">Utilidades</a></strong> para darte velocidad y simplicidad',
        },
        {
          icon: 'i-mdi-bug',
          description: '<strong style="color: #0080ff"><a href="/docs/platform/projects/logs">Logs</a></strong> y métricas para observabilidad y control en tiempo real',
        },
        {
          icon: 'i-mdi-send-clock',
          description: '<strong style="color: #0080ff"><a href="">Tareas Cron</a></strong> recurrentes programadas',
        },
        {
          icon: 'i-mdi-database-lock',
          description: '<strong style="color: #0080ff"><a href="">Base de datos KV</a></strong> incorporada (proximamente)',
        },
        {
          icon: 'i-mdi-microsoft-visual-studio-code',
          description: '<strong style="color: #0080ff"><a href="/docs/netzo/cli">CLI</a></strong> que habilita el desarrollo local',
        },
        {
          icon: 'i-mdi-git',
          description: '<strong style="color: #0080ff"><a href="">Soporte de Git</a></strong> para gestión de versiones',
        },
        {
          icon: 'i-mdi-rocket-launch',
          description: '<strong style="color: #0080ff">Despliega en un solo click</strong> sin configuración ni DevOps',
        },
      ],
    },
    sectionHowIsNetzoDifferent: {
      topic: '¿Cómo es diferente Netzo?',
      title: 'Obten la ventaja competitiva con tecnología de punta',
      items: [
        {
          icon: 'i-logos-deno',
          title: 'Impulsado por Deno',
          description: 'Construido sobre la próxima generación de JavaScript y TypeScript que mejora tu experiencia de desarrollo (DX).',
        },
        {
          icon: 'i-mdi-nodejs',
          title: 'Soporte completo para Node.js y NPM',
          description: 'Programa con tus librerías favoritas de Node.js con soporte completo de los módulos integrados de Node.js y los paquetes de NPM.',
        },
        {
          icon: 'i-fxemoji-lightningmood',
          title: 'Sin servidor',
          description: 'Implementa tu código instantáneamente a nivel global sin necesidad de provisionar ni gestionar infraestructura.',
        },
        {
          icon: 'i-logos-typescript-icon',
          title: 'TypeScript nativo',
          description: 'Utiliza TypeScript sin necesidad de compilaciones o configuraciones complejas. Disfruta de autocompletado y seguridad de tipos.',
        },
        {
          icon: 'i-mdi-package-variant-closed',
          // title: 'Importa desde URL de <s><code style='opacity: 0.7; color: red;'>NPM</code></s>',
          title: 'Importaciones desde URL y portabilidad mejorada',
          description: 'Olvídate de <code>node_modules</code>. Importa código directamente desde URLs con versiones sin necesidad de instalación.',
        },
        {
          icon: 'i-mdi-asterisk',
          title: 'Secretos gestionados',
          description: 'Mantén los secretos seguros a través de una capa adicional de seguridad y reutilízalos rápidamente al programar.',
        },
        {
          icon: 'i-mdi-console',
          title: 'Programa localmente a través de la interfaz de línea de comandos (CLI) de Netzo',
          description: 'Programa en tu IDE favorito y despliega en la nube utilizando <code>netzo/cli</code> sin necesidad de configuración o herramientas adicionales.',
        },
        {
          icon: 'i-mdi-toolbox',
          title: 'Toolbox integrado de componentes y utilidades',
          description: 'Importa desde <code>netzo</code>, una caja de herramientas de componentes y utilidades creada para multiplicar por 10 tu experiencia de desarrollo (DX) al desarrollar apps empresariales a medida.',
        },
      ],
    },
    sectionWhoIsNetzoFor: {
      topic: '¿Para quién es Netzo?',
      title: 'Un hub central para equipos en empresas técnológicas',
      image: {
        alt: '¿Para quién es Netzo?',
        src: '/images/home/code-deploy-share-feedback.svg',
        class: 'mb-8',
      },
      items: [
        {
          title: 'Equipos de Desarrolladores',
          description: 'Programa, despliega y comparte cualquier cosa al instante, con control total y sin manejar infraestructura.',
          image: {
            alt: 'Equipos de Desarrolladores',
            src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMiA1LjVBMy41IDMuNSAwIDAgMSAxNS41IDlhMy41IDMuNSAwIDAgMS0zLjUgMy41QTMuNSAzLjUgMCAwIDEgOC41IDlBMy41IDMuNSAwIDAgMSAxMiA1LjVNNSA4Yy41NiAwIDEuMDguMTUgMS41My40MmMtLjE1IDEuNDMuMjcgMi44NSAxLjEzIDMuOTZDNy4xNiAxMy4zNCA2LjE2IDE0IDUgMTRhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zbTE0IDBhMyAzIDAgMCAxIDMgM2EzIDMgMCAwIDEtMyAzYy0xLjE2IDAtMi4xNi0uNjYtMi42Ni0xLjYyYTUuNTM2IDUuNTM2IDAgMCAwIDEuMTMtMy45NmMuNDUtLjI3Ljk3LS40MiAxLjUzLS40Mk01LjUgMTguMjVjMC0yLjA3IDIuOTEtMy43NSA2LjUtMy43NXM2LjUgMS42OCA2LjUgMy43NVYyMGgtMTN2LTEuNzVNMCAyMHYtMS41YzAtMS4zOSAxLjg5LTIuNTYgNC40NS0yLjljLS41OS42OC0uOTUgMS42Mi0uOTUgMi42NVYyMEgwbTI0IDBoLTMuNXYtMS43NWMwLTEuMDMtLjM2LTEuOTctLjk1LTIuNjVjMi41Ni4zNCA0LjQ1IDEuNTEgNC40NSAyLjlWMjBaIi8+PC9zdmc+',
          },
        },
        {
          title: 'PYMEs y Startups',
          description: 'Escala tus operaciones con aplicaciones back-office y automatización de procesos en un solo lugar, sin invertir una fortuna.',
          image: {
            alt: 'PYMEs y Startups',
            src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMiAxOEg2di00aDZtOSAwdi0ybC0xLTVINGwtMSA1djJoMXY2aDEwdi02aDR2Nmgydi02bTAtMTBINHYyaDE2VjRaIi8+PC9zdmc+',
          },
        },
        {
          title: 'Corporaciones',
          description: 'Mejora la eficiencia operativa con aplicaciones back-office a medida y con 100% de adaptabilidad a los procesoss establecidos.',
          image: {
            alt: 'Corporaciones',
            src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01IDN2MThoNnYtMy41aDJWMjFoNlYzSDVtMiAyaDJ2Mkg3VjVtNCAwaDJ2MmgtMlY1bTQgMGgydjJoLTJWNU03IDloMnYySDdWOW00IDBoMnYyaC0yVjltNCAwaDJ2MmgtMlY5bS04IDRoMnYySDd2LTJtNCAwaDJ2MmgtMnYtMm00IDBoMnYyaC0ydi0ybS04IDRoMnYySDd2LTJtOCAwaDJ2MmgtMnYtMloiLz48L3N2Zz4=',
          },
        },
      ],
    },
    // sectionQuote: {
    //   name: 'Guillermo Rauch',
    //   title: 'CEO de Vercel',
    //   description: 'Las apps empresariales a medida son el latido invisible de cada empresa exitosa.',
    //   image: {
    //     src: 'https://assets.vercel.com/image/upload/v1573246280/front/favicon/vercel/android-chrome-192x192.png',
    //     alt: 'Vercel logo',
    //     width: 49,
    //     height: 48,
    //   },
    // },
    sectionBannerCta: {
      title: '¿Listo para empezar?',
      items: [
        { text: 'Crea tu back-office digital con control total' },
        { text: 'Implementa e itera rápidamente, sin complicaciones' },
        { text: 'Comparte con tu equipo y haz crecer tu negocio' },
      ],
      buttons: [
        {
          type: 'lets-talk',
          text: 'Contáctanos',
        },
      ],
    },
  },
  blog: {
    hero: {
      topic: 'blog',
      title: 'Las últimas noticias de Netzo',
      description: 'Manténgase actualizado sobre las últimas novedades, consejos y trucos del equipo de Netzo y la comunidad.',
    },
    banner: '<a href="#newsletter">¡Suscríbase para recibir actualizaciones!</a>',
  },
  contact: {
    general: {
      hero: {
        topic: 'Contacto',
        title: 'Comienza con Netzo',
        description: 'Por favor, completa el formulario a continuación y nos pondremos en contacto lo antes posible.',
        buttons: [
          {
            type: 'book-a-slot',
            text: 'Reserva una demo',
          },
        ],
      },
    },
  },
  designKit: {
    hero: {
      topic: 'Kit de diseño',
      title: 'Comparte tus creaciones de Netzo',
      description: 'Nuestros logotipos y marca están disponibles para su uso cuando los enlaces al sitio web de netzo.io y respetas nuestra política de marcas registradas. Te animamos a usarlos para soluciones impulsadas por Netzo.',
    },
    banner: 'Haz clic derecho en la imagen y selecciona "Guardar imagen como..."',
  },
  pricing: {
    hero: {
      topic: 'precios',
      title: 'Precios Flexibles que se Ajustan a Ti',
      description: 'Contáctanos para comenzar con un plan personalizado ajustado a tus necesidades.',
    },
    plans: {
      business: {
        title: 'Business',
        price: 'Personalizado',
        // unit: 'por mes',
        button: {
          variant: 'primary',
          text: 'Contactanos',
          href: 'https://calendar.app.google/tnmzyUswAVUomHDs7',
          target: '_blank',
        },
      },
      enterprise: {
        title: 'Enterprise',
        price: 'Personalizado',
        button: {
          variant: 'secondary',
          text: 'Contactanos',
          href: 'https://calendar.app.google/tnmzyUswAVUomHDs7',
          target: '_blank',
          class: '!text-white-500 !bg-black-500',
        },
      },
    },
    items: [
      {
        type: 'subheader',
        title: 'Usuarios',
        description: 'Los usuarios son miembros de un Workspace con una cuenta de usuario y un rol predefinido. La cantidad de usuarios que pueden ser parte de un Workspace está limitada por el plan del Workspace.',
      },
      {
        title: 'Usuarios incluidos',
        description: 'Son los usuarios incluidos en el plan suscripcion del Workspace.',
        business: ['5', 'Contactanos para conocer precios por usuario adicional.'],
        enterprise: 'Custom',
      },
      {
        title: 'Límite de usuarios',
        description: 'Máximo numero de usuarios del Workspace en la subscripción.',
        business: '20',
        enterprise: 'Ilimitado',
      },
      {
        type: 'subheader',
        title: 'Recursos del Workspace',
        description: '',
      },
      {
        title: 'Proyectos',
        description: 'Los proyectos son aplicaciones web. Cada proyecto contiene sus propio deployments, base de datos, logs y más.',
        business: '20',
        enterprise: 'Custom',
      },
      {
        title: 'Solicitudes',
        description: 'Solicitudes HTTP realizadas para invocar cualquiera de los deployments de un Proyecto.',
        business: ['50k al mes', 'Contacanos para conocer precios por solicitud adicional.'],
        enterprise: 'Custom',
      },
      {
        title: 'Base de datos',
        description: 'Capacidad de almacenamiento de datos incluida para todos los Proyectos del Workspace.',
        business: ['5 GB', 'Contacanos para conocer precios de almacenamiento adicional'],
        enterprise: 'Custom',
      },
      {
        title: 'Transferencia de datos',
        description: 'Cantidad de datos transferidos a través de todos sus Proyectos en un mes dado.',
        business: ['1 GB al mes', 'Contacanos para conocer precios de transferencia adicional.'],
        enterprise: 'Custom',
      },
      {
        title: 'Retención de notificaciones',
        description: 'Periodo de retención de notificaciones en la bandeja de entrada.',
        business: '30 días',
        enterprise: '365 días',
      },
      {
        title: 'Retención de logs',
        description: 'Periodo de retención de logs de Proyectos.',
        business: '30 días',
        enterprise: '365 días',
      },
      {
        type: 'subheader',
        title: 'Módulos y Funciones',
        description: '',
      },
      {
        title: 'App launcher',
        description: 'Comparte tus aplicaciones empresariales de manera segura en un clic.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Inbox',
        description: 'Envia notificaciones personalizadas a la bandeja de entrada de los usuarios con una sola línea de código.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Studio',
        description: 'Vista previa y auditoria de código para garantizar la calidad y seguridad.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'CLI',
        description: 'Interfaz de línea de comandos para agilizar el desarrollo local.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Logs',
        description: 'Logs de uso y errores de Proyectos desplegados en tiempo real.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Solicitudes',
        description: 'Herramienta de prueba y depuración de solicitudes y respuestas a tus Proyectos.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Bases de datos',
        description: 'Base de datos (KV) incorporada a tus proyetos en una sola línea de código.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Integraciones de APIs',
        description: 'Integra fácilmente cualquier API sin grandes esfuerzos de configuracion y authentificación.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Schedules',
        description: 'Ejecute Proyectos según un horario con trabajos CRON.',
        business: { class: 'i-mdi-clock-outline' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Plantillas',
        description: 'Plantillas de aplicaciones empresariales para comenzar a desarrollar en segundos.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Deployments',
        description: '',
      },
      {
        title: 'Deployments versionados',
        description: '',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Reversión de despliegue',
        description: 'Revierte a una versión anterior de tu Proyecto en un solo clic.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Subdominios personalizados',
        description: 'Subdominios aleatorios *.netzo.dev para todos tus Proyectos.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Dominios personalizados',
        description: 'Utiliza tus propios dominios para todos tus Proyectos.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Selección de regiónes',
        description: 'Elije las regiones de despliegue para tus bases de datos y Proyectos.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Tiempo de CPU',
        description: 'El tiempo de CPU es cuántos segundos estuvo ocupada la CPU, no el tiempo de reloj de pared.',
        business: 'Hasta 50 ms',
        enterprise: 'Custom',
      },
      {
        type: 'subheader',
        title: 'Seguridad',
        description: '',
      },
      {
        title: 'Source control',
        description: 'Control de versiones con Git, de la forma que te gusta.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'API keys del Workspace',
        description: 'API keys con alcance a todos los recursos de su Workspace.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'API keys del proyecto',
        description: 'API keys con alcance a proyectos individuales.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        title: 'Registros de auditoría',
        description: 'Logs de actividad de los usuarios y cambios del Workspace.',
        business: '30 días',
        enterprise: '365 días',
      },
      {
        title: 'SAML y single-sign on (SSO)',
        description: 'Usa tu proveedor de identidad (IdP) para autenticar a los usuarios de tu Workspace.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
      {
        type: 'subheader',
        title: 'Soporte',
        description: '',
      },
      {
        title: 'Soporte comunitario',
        description: 'Via nuestra comunidad en Discord.',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Soporte por email',
        description: '',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Horario estándar',
        description: 'Horario de atención de lunes a viernes de 9:00 a 19:00 (GMT+2).',
        business: { class: 'i-mdi-check' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Horario extendido',
        description: 'Horario de atención sábados de 12:00 a 18:00 (GMT+2).',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Priorización en desarrollo',
        description: 'Recibe acceso temprano a nuevas funcionalidades y ayuda a darles forma.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Gerente de cuenta dedicado',
        description: 'Acceso a un gerente de cuenta dedicado y al soporte de ingeniera de Netzo.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Canal dedicado',
        description: 'Canal de comunicación dedicado para soporte y consultas via Discord.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Servicios profesionales',
        description: 'Le ayudamos a construir aplicaciones personalizadas, capacitar equipos, definir su estrategia técnica e implementar las mejores prácticas en toda su organización.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'DPA',
        description: 'Acuerdo de procesamiento de datos (DPA) entre ambas partes.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'Pago por factura',
        description: 'Paga tras una factura en lugar de una tarjeta de crédito.',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-check' },
      },
      {
        title: 'SLA personalizado',
        description: '',
        business: { class: 'i-mdi-minus' },
        enterprise: { class: 'i-mdi-clock-outline' },
      },
    ],
    faqs: {
      title: 'Preguntas frecuentes',
      items: [
        {
          title: '¿Qué es un Workspace?',
          description: 'Los espacios de trabajo son contenedores de nivel superior que poseen recursos de aplicación. Un Workspace es un entorno privado donde puedes crear e implementar tus proyectos. Cada Workspace tiene un plan de Workspace y se factura en consecuencia.',
        },
        {
          title: '¿Qué es un usuario (interno)?',
          description: 'Son miembros de un Workspace con una cuenta de usuario de Netzo y un rol predefinido. La cantidad de usuarios que pueden formar parte de un Workspace está limitada por el plan del Workspace.',
        },
        {
          title: '¿Qué es un usuario (externo)?',
          description: 'Son usuarios finales de un Proyecto (usualmente con una interfaz de usuario). Ponte en contacto para conocer más sobre esta funcionalidad.',
        },
        {
          title: '¿Qué es un proyecto?',
          description: 'Son aplicaciones serverless, ejecutables en URLs web. Un proyecto contiene todo su código, datos y archivos de configuración necesarios para implementarse y ejecutarse. Además, todos sus Deployments, Solicitudes y Logs están asociados a usn proyecto.',
        },
        {
          title: '¿Qué es un Deployment?',
          description: 'Son el resultado de un "build" exitoso  de un Proyecto y su despligue a un URL web. Un Deployment es una instancia en ejecución de tu aplicación. Puedes crear tantos Deployments como necesites.',
        },
      ],
    },
  },
  footer: {
    items: [
      {
        text: 'Soluciones',
        items: [
          { text: '¿Qué es Netzo?', link: '/es/netzo/what-is-netzo' },
          { text: '¿Por qué usar Netzo?', link: '/es/netzo/why-use-netzo' },
          { text: '¿Para quién es Netzo?', link: '/es/netzo/who-is-netzo-for' },
        ],
      },
      {
        text: 'Recursos',
        items: [
          {
            text: 'Docs',
            link: '/docs/introduction/getting-started',
          },
          // {
          //   text: 'Centro de Ayuda',
          //   link: 'https://help.netzo.io',
          // },
          {
            text: 'Plantillas',
            link: 'https://app.netzo.io/templates',
          },
          {
            text: 'Integraciones',
            link: '/docs/netzo/apis',
          },
          {
            text: 'Contacto',
            link: 'mailto:help@netzo.io?subject=¿En%20qué%20podemos%20ayudarte%3F&body=Estimado%20equipo%20de%20Netzo%2C%0A%0AEstoy%20interesado%20en%20sus%20productos%20y%20servicios.%0A%0AConsulta%20de%20venta%3A%0A%0APor%20favor%2C%20proporcionenme%20más%20información%20sobre%20precios%2C%20funciones%20y%20disponibilidad.%20Espero%20poder%20programar%20una%20llamada%20con%20un%20miembro%20de%20su%20equipo%20de%20ventas%20para%20discutir%20esto%20más%20detalladamente.%0A%0ASoporte%20técnico%3A%0A%0AEstoy%20experimentando%20un%20problema%20con%20Netzo%2C%20específicamente%20%5Binsertar%20descripción%20del%20problema%20que%20estás%20experimentando%5D.%20Agradecería%20su%20ayuda%20para%20solucionar%20este%20problema%20y%20resolverlo%20lo%20antes%20posible.%0A%0AComentarios%3A%0A%0AAquí%20están%20los%20detalles%20de%20los%20problemas%20que%20encontré%3A%20%5Binsertar%20descripción%20del%20problema%201%5D%2C%20%5Binsertar%20descripción%20del%20problema%202%5D%2C%20%5Binsertar%20descripción%20del%20problema%203%5D.%0AQuería%20dar%20alguna%20retroalimentación%20sobre%20mi%20experiencia%20usando%20Netzo.%0A%0ASaludos%2C%0A%5BInsertar%20tu%20nombre%5D',
          },
          {
            text: 'Kit de Diseño',
            link: '/design-kit',
          },
        ],
      },
      {
        text: 'Legal',
        items: [
          ...legalES.items,
          { text: 'Ajustes de Privacidad', onClick: () => window.UC_UI.showSecondLayer() },
        ],
      },
    ],
  },
}
