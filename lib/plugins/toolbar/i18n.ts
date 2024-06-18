export const locales = {
  en: {
    buttons: {
      toggleDarkMode: "Toggle Dark Mode",
      share: "Share",
      feedback: "Feedback",
      info: "Information",
      expand: "Expand toolbar",
      collapse: "Collapse toolbar",
      apps: {
        title: "My Apps",
        description: "Browse all applications shared with me",
        newRequest:
          "Contact us at hello@netzo.io to submit new application requests. We will be happy to help you!",
      },
    },
    dialogFeedbackNetzolabs: {
      title: "Report an Issue",
      description: "Please provide details about the issue encountered.",
      form: {
        type: {
          label: "Type",
          options: [
            { value: "bug", label: "Bug Report" },
            { value: "enhancement", label: "Enhancement Request" },
            { value: "feature", label: "Feature Request" },
            { value: "feedback", label: "General Feedback" },
            { value: "question", label: "Question" },
          ],
        },
        title: { label: "Title" },
        description: { label: "Description" },
        submit: "Submit",
      },
    },
    dialogInfo: {
      title: "Appllication Information",
      content: {
        name: "Name",
        description: "Description",
        version: "Version",
      },
    },
  },
  es: {
    buttons: {
      toggleDarkMode: "Alternar modo oscuro",
      share: "Compartir",
      feedback: "Feedback",
      info: "Información",
      expand: "Expandir barra de herramientas",
      collapse: "Colapsar barra de herramientas",
      apps: {
        title: "Mis Apps",
        description: "Navegar todas las aplicaciones compartidas conmigo",
        newRequest:
          "Contáctenos en hello@netzo.io para enviar nuevas solicitudes de aplicación. ¡Estaremos encantados de ayudarte!",
      },
    },
    dialogFeedbackNetzolabs: {
      title: "Reportar incidencia",
      description: "Proporcione detalles sobre la incidencia encontrada.",
      form: {
        type: {
          label: "Tipo",
          options: [
            { value: "bug", label: "Reporte de error" },
            { value: "enhancement", label: "Solicitud de mejora" },
            { value: "feature", label: "Solicitud de nueva funcionalidad" },
            { value: "feedback", label: "Comentarios generales" },
            { value: "question", label: "Pregunta" },
          ],
        },
        title: { label: "Título" },
        description: { label: "Descripción" },
        submit: "Enviar",
      },
    },
    dialogInfo: {
      title: "Información de la aplicación",
      content: {
        name: "Nombre",
        description: "Descripción",
        version: "Versión",
      },
    },
  },
} as const;
