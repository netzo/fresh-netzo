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
        capturePoint: 'websiteContactForm',
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

const contactPurposeOptionsEnum = {
  en: ['Contact sales', 'Technical support', 'My privacy', 'Other'],
  es: ['Contacto ventas', 'Soporte técnico', 'Mi privacidad', 'Otro'],
}

// OLD: contactPurposeOptionsEnum?.[locale?.value]
const contactPurposeOptions = computed(() => contactPurposeOptionsEnum.en)

const en = {
  contactPurpose: {
    label: 'Contact purpose',
    placeholder: '-- Select --',
  },
  firstName: {
    label: 'First name',
    placeholder: 'Juan',
  },
  lastName: {
    label: 'Last name',
    placeholder: 'Perez',
  },
  email: {
    label: 'Email',
    placeholder: 'Email',
  },
  phone: {
    label: 'Phone number (Optional)',
    placeholder: '+34600000000',
  },
  organizationName: {
    label: 'Organization name',
    placeholder: 'Acme Corp.',
  },
  message: {
    label: 'Message',
    placeholder: 'How can we help you?',
  },
  consentProcessRequest: {
    label: 'By submitting, you acknowledge that the personal data you provided will be transferred to our customer management systems and will only be used to process your request.',
  },
  consentMessage: {
    label: 'Visit our <a href="https://netzo.io/legal/privacy-policy">privacy policy</a> for more info.',
  },
  submit: {
    label: 'Submit',
  },
}
</script>

<template>
  <div class="form-contact-general">
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
        type="select"
        name="contactPurpose"
        :label="en.contactPurpose.label"
        :placeholder="en.contactPurpose.placeholder"
        :options="contactPurposeOptions"
      />
      <FormKit
        type="text"
        name="firstName"
        :label="en.firstName.label"
        :placeholder="en.firstName.placeholder"
        validation="required"
      />
      <FormKit
        type="text"
        name="lastName"
        :label="en.lastName.label"
        :placeholder="en.lastName.placeholder"
        validation="required"
      />
      <FormKit
        type="text"
        name="email"
        :label="en.email.label"
        :placeholder="en.email.placeholder"
        validation="required|email"
      />
      <FormKit
        type="tel"
        name="phone"
        :label="en.phone.label"
        :placeholder="en.phone.placeholder"
      />
      <FormKit
        type="text"
        name="organizationName"
        :label="en.organizationName.label"
        :placeholder="en.organizationName.placeholder"
        validation="required"
      />
      <FormKit
        type="textarea"
        name="message"
        :label="en.message.label"
        :placeholder="en.message.placeholder"
        validation="required"
      />
      <FormKit
        type="checkbox"
        name="consentProcessRequest"
        :label="en.consentProcessRequest.label"
        validation="accepted"
        validation-visibility="dirty"
      />

      <FormKit type="submit" :label="en.submit.label" />

      <p class="consent-message" v-html="en.consentMessage.label" />
    </FormKit>

    <div v-else class="form-success-message">
      <svg width="64" height="64" viewBox="0 0 24 24"><path fill="#518bff" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" /></svg>
      <span>Thanks for reaching out!</span>
      <span>We'll get back to you soon.</span>
    </div>
  </div>
</template>

<style>
.form-contact-general {
  display: flex;
  margin: auto;
  margin-top: 64px;
}

.form-contact-general form {
  margin: auto;
}

.form-contact-general form * {
  max-width: 525px;
}

.form-contact-general form * {
  text-align: start;
}

.form-contact-general .consent-message {
  font-size: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.form-contact-general form [data-type="submit"] button {
  width: 100%;
}

.form-success-message {
  display: grid;
  place-items: center;
  margin: auto;
  height: min-content;
  gap: 16px;
}

.form-success-message span {
  font-weight: 500;
  font-size: 18px;
}
</style>
