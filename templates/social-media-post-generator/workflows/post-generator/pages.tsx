/** @jsx h */
import { h } from 'netzo/mod.ts'

export const PageContact = (props) => {
  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css'
          integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls'
          crossorigin='anonymous'
        />
      </head>

      <body>
        <form
          method='POST'
          action={props.url}
          class='pure-form'
          style='display: grid; grid-gap: 6px; max-width: 400px; margin: auto;'
        >
          <label for='first-name'>First name</label>
          <input id='first-name' type='text' name='firstName' required />
          <label for='last-name'>Last name</label>
          <input id='last-name' type='text' name='lastName' required />
          <label for='email'>Email</label>
          <input id='email' type='email' name='email' required />
          <label for='organization-name'>Organization</label>
          <input id='organization-name' type='text' name='organizationName' />
          <label for='message'>How can we help?</label>
          <textarea
            id='message'
            name='message'
            rows='6'
            cols='50'
            placeholder='Please add all relevant info that may help us speed up a response.'
            required
          >
          </textarea>
          <fieldset style='border:0px;'>
            <div class='item'>
              <input
                id='consent-process-request'
                type='checkbox'
                name='consentProcessRequest'
                required
              />
              <label>
                By submitting, you acknowledge that the personal data you
                provided will be transferred to our customer management systems
                and will only be used to process your request.
              </label>
            </div>
            <p>
              Visit our{' '}
              <a href='https://netzo.io/es/legal/politica-de-privacidad'>
                privacy policy
              </a>{' '}
              for more info.
            </p>
          </fieldset>
          <button type='submit' class='pure-button pure-button-primary'>
            Submit
          </button>
        </form>
      </body>
    </html>
  )
}

export const PageNewsletter = (props) => {
  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css'
          integrity='sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls'
          crossorigin='anonymous'
        />
      </head>

      <body>
        <form
          class='pure-form'
          method='POST'
          action={props.url}
          style='display: grid; grid-gap: 6px; max-width: 400px; margin: auto;'
        >
          <label for='email'>Email</label>
          <input id='email' type='email' name='email' />
          <fieldset style='border:0px;'>
            <div class='item'>
              <input
                id='consent-process-request'
                type='checkbox'
                name='consentProcessRequest'
              />
              <label>
                We use Sendinblue as our marketing platform. By subscribing, you
                acknowledge that the email you provided will be transferred to
                Sendinblue for processing in accordance with{' '}
                <a href='https://www.sendinblue.com/legal/termsofuse/'>
                  their terms of use
                </a>. You may unsubscribe at any time using the link in our
                newsletter.
              </label>
            </div>
            <p>
              Visit our{' '}
              <a href='https://netzo.io/es/legal/politica-de-privacidad'>
                privacy policy
              </a>{' '}
              for more info.
            </p>
          </fieldset>
          <button type='submit' class='pure-button pure-button-primary'>
            Submit
          </button>
        </form>
      </body>
    </html>
  )
}

const IconCheck = () => (
  <svg width='100' height='100' viewBox='0 0 24 24'>
    <path
      fill='#518bff'
      d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z'
    >
    </path>
  </svg>
)

const IconClose = () => (
  <svg width='100' height='100' viewBox='0 0 24 24'>
    <path
      fill='#ff8080'
      d='M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z'
    >
    </path>
  </svg>
)

export const PageMessage = (props) => {
  const propsEnum = {
    success: {
      message: 'We have recieved your message and will get to you soon!',
      icon: <IconCheck />,
    },
    'confirmation-email': {
      message: 'Please check you inbox to confirm your subscription!',
      icon: <IconCheck />,
    },
    subscribed: {
      message: 'You have been subscribed!',
      icon: <IconCheck />,
    },
    unsubscribed: {
      message: 'You have been unsubscribed!',
      icon: <IconClose />,
    },
  }

  const { message, icon } = propsEnum?.[props.status] ?? {
    message: 'Status unknown',
  }

  return (
    <html>
      <body>
        <div style='display: grid; place-items: center; margin: auto; height: min-content; gap: 16px;'>
          {icon}
          <span style='font-size: 16pt;'>{message}</span>
        </div>
      </body>
    </html>
  )
}
