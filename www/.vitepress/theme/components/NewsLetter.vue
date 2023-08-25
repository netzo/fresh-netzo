<script setup lang="ts">
import '@formkit/themes/genesis'

const submitted = ref(false)

const submitHandler = async (value) => {
  const NETZO_COMMUNICATIONS_ROUTER_WORKER_URL = 'https://64072891d1988552626b8d90.netzo.io/'
  try {
    const response = await fetch(NETZO_COMMUNICATIONS_ROUTER_WORKER_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      // TODO: 'x-api-key': import.meta.env.VITE_NETZO_API_KEY,
      },
      body: JSON.stringify({
        capturePoint: 'websiteNewsletterSignup',
        value,
      }),
    })
    submitted.value = true
  }
  catch (error) {
    console.error(error)
    submitted.value = false
  }
}

const en = {
  title: 'Subscribe to the Netzo newsletter.',
  caption: 'We use Sendinblue as our marketing platform. By subscribing, you acknowledge that the email you provided will be transferred to Sendinblue for processing in accordance with <a href="https://www.sendinblue.com/legal/termsofuse/">their terms of use</a>. You may unsubscribe at any time using the link in our newsletter. Visit our <a href="/legal/privacy-policy">privacy policy</a> for more information.',
  captionSuccess: 'Thank you! Please check your inbox to confirm your subscription.',
  captionError: 'An error occurred while subscribing the newsletter.',
  description: 'Get the latest Netzo news in your inbox.',
  formInputEmailPlaceholder: 'Email*',
  formSubmitLabel: 'Submit',
  afterSubmitMessage: 'Please check your email to confirm your subscription!',
}
</script>

<template>
  <section id="newsletter" class="NewsLetter">
    <div class="container">
      <h2 class="title">
        {{ en.title }}
      </h2>
      <div class="form-newsletter-signup">
        <FormKit
          v-if="!submitted"
          id="registration-example"
          v-slot="{ value }"
          type="form"
          :form-class="submitted ? 'hide' : 'show'"
          submit-label="Register"
          :actions="false"
          @submit="submitHandler"
        >
          <FormKit
            type="text"
            name="email"
            :placeholder="en.formInputEmailPlaceholder"
            validation="required|email"
          />
          <FormKit
            type="submit"
            :label="en.formSubmitLabel"
          />
        </FormKit>
        <div v-else class="form-success-message">
          <svg width="64" height="64" viewBox="0 0 24 24"><path fill="#518bff" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" /></svg>
          <span>{{ en.captionSuccess }}</span>
        </div>
      </div>
      <p v-if="!submitted" class="caption" v-html="en.caption" />
    </div>
  </section>
</template>

<style scoped>
:deep(.formkit-form) {
  display: flex;
}

:deep(.formkit-outer[data-family="text"]) {
  width: 100%;
  margin-right: 12px;
}

:deep(.formkit-outer[data-family="button"]) {
  width: auto;
}

:deep(.formkit-input) {
  color: unset;
}

:deep(button) {
  color: #fff !important;
  font-weight: 500 !important;
  height: 42px !important;
}

.NewsLetter {
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.5s, background-color 0.5s;
}

.dark .NewsLetter {
  border-top-color: var(--vp-c-divider-light);
  border-bottom-color: transparent;
  background: var(--vp-c-bg);
}

@media (min-width: 768px) {
  .NewsLetter {
    padding: 48px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.title {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  padding-bottom: 20px;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
}

@media (min-width: 375px) {
  .form {
    padding-top: 16px;
  }
}

.box {
  position: relative;
  width: 100%;
}

.caption :deep([href]) {
  cursor: pointer;
  text-decoration: underline;
}

.caption :deep([href]):hover {
  opacity: 0.8;
}

.caption {
  margin: 0 auto;
  padding: 4px;
  width: 100%;
  text-align: justify;
  line-height: 20px;
  font-size: 10px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.link {
  color: var(--vp-c-primary);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vp-c-primary-dark);
}

/* button loading animation */

.button--loading>span {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: var(--vp-c-white);
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

.form-newsletter-signup {
  text-align: center;
}

.form-success-message {
  height: 100px;
  display: grid;
  grid-gap: 6px;
  align-items: center;
}

.form-success-message svg {
  margin: auto;
}
</style>
