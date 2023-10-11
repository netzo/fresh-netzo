// Add a listener to the UC_UI_INITIALIZED event and check if the userhas consented
// to the functional services, if not, show a consent popup for the functional services
window.addEventListener('UC_UI_INITIALIZED', () => {
  const functionalServices = window.UC_UI.getServicesBaseInfo()
    .filter(service => service.categorySlug === 'functional')
  const functionalServicesConsented = functionalServices.filter(service => service.consent.status)
  const hasConsentedAllFunctionalServices = functionalServices.length === functionalServicesConsented.length
  if (!hasConsentedAllFunctionalServices) showConsentPopup()
})

function showConsentPopup() {
  const chatWidget = document.createElement('div')
  chatWidget.innerHTML = `
<div id="consent-popup" style="color: #111111; position: fixed; bottom: 18px; right: 16px; z-index: 10000000;">
  <div id="consent-popup-content" style="display: none; bottom: 18px; right: 16px; width: 300px; border: var(--vp-c-border); border-radius: 5px; background-color: white; padding: 24px 16px 16px 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.25); z-index: 10000000;">
    <button id="consent-close" style="position: absolute; top: 8px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer;" aria-label="Close consent popup">×</button>
    <p style="margin-bottom: 16px;">Hello! 👋🏻 You deserve the best support experience via our</p>
    <ul style="margin-left: 16px; list-style-type: disc;">
      <li>live chat</li>
      <li>onboarding guides</li>
      <li>help center</li>
    </ul>
    <p style="margin-top: 16px; margin-bottom: 16px">With your permission, we can activate these services.</p>
    <div style="padding-top: 12px; display: flex; justify-content: flex-end">
      <button id="more-info" style="color: #111111; font-size: 14px; font-weight: 500; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer; margin-right: 8px;">Privacy Settings</a>
      <button id="consent-accept" style="background-color: var(--vp-c-primary); color: white; font-size: 14px; font-weight: 500; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer;">Enable</button>
    </div>
  </div>
  <div id="consent-chat-icon" style="cursor: pointer; display: flex; justify-content: end;">
    <svg width="60px" height="60px" viewBox="0 0 60 60">
      <g id="right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M6.90917448,41.3294845 C6.83769725,41.212437 6.76324712,41.0951946 6.68573397,40.9777778 L6.76289975,41.0481461 C4.99532213,37.5958143 4,33.6955382 4,29.5666667 C4,15.4465866 15.6405965,4 30,4 C44.3594035,4 56,15.4465866 56,29.5666667 C56,43.6867468 44.3594035,55.1333333 30,55.1333333 C26.3565321,55.1333333 22.8881035,54.3963917 19.7404572,53.0658224 C-3.68800108,60.6255746 12.4215438,52.3468261 7.38027718,42.1818397 C7.21794615,41.9009974 7.06086812,41.616836 6.90917448,41.3294845 Z" id="Mask" fill="#0080ff" transform="translate(30.000000, 30.000000) scale(-1, 1) translate(-30.000000, -30.000000) "></path>
          <path d="M24,22 L35,22 C36.1045695,22 37,22.8954305 37,24 C37,25.1045695 36.1045695,26 35,26 L24,26 C22.8954305,26 22,25.1045695 22,24 C22,22.8954305 22.8954305,22 24,22 Z M24,34 L35,34 C36.1045695,34 37,34.8954305 37,36 C37,37.1045695 36.1045695,38 35,38 L24,38 C22.8954305,38 22,37.1045695 22,36 C22,34.8954305 22.8954305,34 24,34 Z M26,28 L37,28 C38.1045695,28 39,28.8954305 39,30 C39,31.1045695 38.1045695,32 37,32 L26,32 C24.8954305,32 24,31.1045695 24,30 C24,28.8954305 24.8954305,28 26,28 Z" id="Icon" fill="#FFFFFF"></path>
      </g>
    </svg>
  </div>
</div>
  `

  document.body.appendChild(chatWidget)

  setTimeout(() => {
    document.getElementById('consent-popup-content').style.display = 'block'
  }, 10000)

  const consentChatIcon = document.getElementById('consent-chat-icon')
  if (consentChatIcon) {
    consentChatIcon.addEventListener('click', () => {
      document.getElementById('consent-popup-content').style.display = 'block'
    })
  }

  const moreInfoButton = document.getElementById('more-info')
  if (moreInfoButton) {
    moreInfoButton.addEventListener('click', () => {
      window.UC_UI.showSecondLayer()
    })
  }

  const consentCloseButton = document.getElementById('consent-close')
  if (consentCloseButton) {
    consentCloseButton.addEventListener('click', () => {
      document.getElementById('consent-popup-content').style.display = 'none'
    })
  }

  const consentAcceptButton = document.getElementById('consent-accept')
  if (consentAcceptButton) {
    consentAcceptButton.addEventListener('click', () => {
      window.UC_UI.getServicesBaseInfo()
        .filter(service => service.categorySlug === 'functional')
        .forEach(service => window.UC_UI.acceptService(service.id))
      document.body.removeChild(chatWidget)
      // window.location.reload() not required since reload already
      // handled by window.uc.onProvidersOrWhitelistedChange event
    })
  }
}
