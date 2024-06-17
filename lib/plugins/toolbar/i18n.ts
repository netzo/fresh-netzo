export const locales = {
  en: {
    buttons: {
      toggleDarkMode: "Toggle Dark Mode",
      share: "Share",
      feedback: "Feedback",
      info: "Information",
      expand: "Expand toolbar",
      collapse: "Collapse toolbar",
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
    projects: {
      more: "Request information for new projects",
      subject: "Netzo%20Project%20Inquiry",
      body:
        "Hello%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20Netzo%20projects%20and%20how%20I%20can%20contribute.%0A%0ARegards%2C%0A%0A%5BYour%20Name%5D",
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
    projects: {
      more: "Solicitar información para nuevos proyectos",
      subject: "Consulta%20de%20Nuevo%20Proyecto%20Netzo",
      body:
        "Hola%2C%0A%0AEstoy%20interesado%20en%20saber%20más%20sobre%20los%20proyectos%20de%20Netzo%20y%20cómo%20puedo%20contribuir.%0A%0ASaludos%2C%0A%0A%5BTu%20Nombre%5D",
    },
  },
} as const;
