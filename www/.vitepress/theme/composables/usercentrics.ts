export function useUsercentrics() {
  const getServicesByCategory = (
    categorySlug: 'essential' | 'functional' | 'analytics' | string,
  ) => {
    const services = window.UC_UI.getServicesBaseInfo()
    return services.filter((s: any) => s.categorySlug === categorySlug)
  }

  const isServiceEnabled = (serviceName: string) => {
    const services = window.UC_UI.getServicesBaseInfo()
    return services.some((s: any) => s.name === serviceName && s.consent.status)
  }

  /**
   * Send a chat message to Customerly or open an pre-populated
   * email in the default email client if Customerly is not consented
   *
   * @param message - the customerly message or email body
   */
  function sendChatMessageOrEmail(message = 'I want to learn more about Netzo...') {
    if (isServiceEnabled('Customerly')) {
      console.debug('[usercentrics] opening Customerly chat')
      window.customerly.showNewMessage(message) // alternatively showNewMessage(message)
    }
    else {
      console.debug('[usercentrics] opening email')
      message = encodeURIComponent(message)
      const url = `mailto:help@netzo.io?subject=${message}`
      window.open(url, '_blank')
    }
  }

  return { getServicesByCategory, isServiceEnabled, sendChatMessageOrEmail }
}
