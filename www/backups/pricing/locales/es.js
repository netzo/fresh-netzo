export default {
  pricing: {
    hero: {
      topic: 'precios',
      title: 'Precios sencillos que se adaptan a tus necesidades',
      description: 'Comienza con una prueba gratuita o contáctanos para obtener un plan personalizado que se ajuste a tus necesidades.',
    },
    plans: {
      business: {
        title: 'Empresa',
        price: '50€',
        unit: 'por usuario al mes',
        button: {
          variant: 'primary',
          text: 'Pruébalo Gratis',
          href: 'https://api.netzo.io/oauth/auth0?redirect=/',
          target: '_blank',
        },
      },
      enterprise: {
        title: 'Empresa grande',
        price: 'Personalizado',
        button: {
          variant: 'secondary',
          text: 'Contactar a Ventas',
          href: 'https://calendly.com/netzo-arturoromero',
          target: '_blank',
          class: '!text-white-500 !bg-black-500',
        },
      },
    },
    items: [
      {
        type: 'subheader',
        title: 'Límites',
        description: '',
      },
      {
        title: 'Usuarios',
        description: '',
        business: 'Hasta 20',
        enterprise: 'Personalizado',
      },
      {
        title: 'Proyectos',
        description: '',
        business: '5 por usuario',
        enterprise: 'Personalizado',
      },
      {
        type: 'subheader',
        title: 'Límites del Proyecto',
        description: '',
      },
      {
        title: 'Implementaciones',
        description: '',
        business: '100 por proyecto',
        enterprise: 'Personalizado',
      },
      {
        title: 'Solicitudes',
        description: '',
        business: '1,000 por proyecto',
        enterprise: 'Personalizado',
      },
      {
        title: 'Registros',
        description: '',
        business: '100,000 por proyecto',
        enterprise: 'Personalizado',
      },
      {
        type: 'subheader',
        title: 'Otros',
        description: '',
      },
      {
        title: 'Soporte multiinquilino',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Asistente de IA',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'Integración de GitHub',
        description: 'Integración de GitHub con repositorios públicos y privados',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        type: 'subheader',
        title: 'Infraestructura',
        description: '',
      },
      {
        title: 'Regiones',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Selección de región',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'Subdominios comodín',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Dominios personalizados',
        description: '',
        business: { icon: 'i-mdi-clock-outline' },
        enterprise: { icon: 'i-mdi-clock-outline' },
      },
      {
        title: 'Tiempo de CPU por solicitud',
        description: 'El tiempo de CPU es cuántos segundos la CPU estuvo ocupada, no el tiempo transcurrido en el reloj.',
        business: 'Hasta 50 ms',
        enterprise: 'Hasta 50 ms',
      },
      {
        title: 'Transferencia de datos de entrada',
        description: 'La transferencia de datos de entrada es la información enviada a su aplicación desde Internet.',
        business: 'Sin límites',
        enterprise: 'Sin límites',
      },
      {
        title: 'Transferencia de datos de salida',
        description: 'La transferencia de datos de salida es la información enviada desde su aplicación a Internet.',
        business: '100 GiB',
        enterprise: '100 GiB',
      },
      {
        type: 'subheader',
        title: 'Seguridad',
        description: '',
      },
      {
        title: 'Registros de auditoría',
        description: '',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Cumplimiento',
        description: '',
      },
      {
        title: 'Cumplimiento GDPR',
        description: 'Cumplimiento del Reglamento General de Protección de Datos (GDPR).',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        title: 'Cumplimiento CCPA',
        description: 'Cumplimiento de la Ley de Privacidad del Consumidor de California (CCPA).',
        business: { icon: 'i-mdi-check' },
        enterprise: { icon: 'i-mdi-check' },
      },
      {
        type: 'subheader',
        title: 'Soporte',
        description: 'Un canal de soporte separado y dedicado o un acuerdo de nivel de servicio (ANS) personalizado.',
        business: 'Soporte dedicado',
        enterprise: 'ANS personalizado',
      },
    ],
    faqs: {
      title: 'Preguntas frecuentes',
      items: [
        {
          title: '¿Qué es un espacio de trabajo?',
          description: 'Los espacios de trabajo son contenedores de nivel superior que poseen recursos de aplicación. Un espacio de trabajo es un entorno privado donde puedes crear e implementar tus proyectos. Cada espacio de trabajo tiene un plan de espacio de trabajo y se factura en consecuencia.',
        },
        {
          title: '¿Qué es un usuario?',
          description: 'Los usuarios son miembros de un espacio de trabajo con una cuenta de usuario y un rol predefinido. La cantidad de usuarios que pueden formar parte de un espacio de trabajo está limitada por el plan del espacio de trabajo.',
        },
        {
          title: '¿Qué es un proyecto?',
          description: 'Los proyectos son aplicaciones sin servidor implementadas en URL web. Un proyecto contiene todo el código, los datos y los archivos de configuración necesarios para implementar y ejecutar tu aplicación. Además, todas las implementaciones, solicitudes y registros están asociados a un proyecto.',
        },
        {
          title: '¿Qué es una implementación?',
          description: 'Las implementaciones son el resultado de una ejecución exitosa de una implementación en el espacio de trabajo. Una implementación es una instancia en ejecución de tu aplicación. Puedes crear tantas implementaciones como necesites.',
        },
        {
          title: '¿Cómo funciona la facturación para empresas?',
          description: 'Contáctanos en <a href="mailto:hello@netzo.io" target="_blank">hello@netzo.io</a> o a través del chat en vivo. ¡Estamos encantados de ayudarte!',
        },
      ],
    },
  },
}
