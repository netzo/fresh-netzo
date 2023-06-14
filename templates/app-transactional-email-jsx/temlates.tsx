/** @jsx h */
import { h } from 'netzo/mod.ts'
import replace from 'object-replace-mustache'
import emailTemplates from './en.json' assert { type: 'json' }

export const HtmlTemplate = (props) => {
  const templatedObject = emailTemplates?.[props.page] ??
    { message: 'Page unknown' }
  // replace {{vars}} in values of object with data (retains keys)
  const {
    pageTitle,
    title,
    description,
    buttonPrimary,
    buttonSecondary,
    caption,
    showPreferences,
  } = replace(templatedObject, props.data)

  const btnPrimary = buttonPrimary
    ? (
      <button type={buttonPrimary.type} class='primary'>
        <a href={buttonPrimary.href} target='_blank'>
          {buttonPrimary.description}
        </a>
      </button>
    )
    : undefined

  const btnSecondary = buttonSecondary
    ? (
      <button type={buttonSecondary.type} class='secondary'>
        <a href={buttonSecondary.href} target='_blank'>
          {buttonSecondary.description}
        </a>
      </button>
    )
    : undefined

  const styles = `
  body {
    width: 100vw;
    height: 100vh;
  }

  .container {
      height: 100%;
      display: grid;
      max-height: 700px !important;
      justify-content: center;
      place-items: center;
      font-family: Inter, Roboto, sans-serif;
      text-align: center
    }

    .logo {
      height: 100px;
      width: 100px;
      display: block;
      background: url(https://netzo.io/images/netzo-symbol-light.png);
      background-size: contain;
    }

    .title {
    }

    .description {
      max-width: 800px;
    }

    .button button {
      background: #4C7BFF;
      padding: 10px !important;
      margin: 4px;
      border-radius: 5px;
      border: 0px;
      font-weight: 600;
    }

    .button .primary {
      background: #4C7BFF;
    }

    .button .secondary {
      background: #F1F1F1;
    }

    .button .primary a {
      color: #ffffff !important;
      text-decoration: none;
      text-transform: uppercase;
    }

    .button .secondary a {
      color: #747474 !important;
      text-decoration: none;
      text-transform: uppercase;
    }

    .caption {
      font-size: 80%;
      color: #747474;
    }

    .social-media a {
      display: inline-block;
      filter: opacity(0.55);
    }

    .github {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/github.png);
      background-size: contain;
    }

    .discord {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/discord.png);
      background-size: contain;
    }

    .facebook {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/facebook.png);
      background-size: contain;
    }

    .instagram {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/instagram.png);
      background-size: contain;
    }

    .linkedin {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/linkedin.png);
      background-size: contain;
    }

    .twitter {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/twitter.png);
      background-size: contain;
    }

    .youtube {
      height: 20px;
      width: 20px;
      display: block;
      background: url(https://netzo.io/images/youtube.png);
      background-size: contain;
    }

    .contact-details {
      padding-top: 10px;
      font-size: 80%;
      color: #747474;
    }

    .manage-preferences,
    .manage-preferences a {
      padding-top: 10px;
      text-decoration: none;
      font-size: 80%;
      color: #747474;
    }`

  return (
    <html>
      <head>
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='format-detection' content='telephone=no' />
        <title>Netzo | {pageTitle}</title>
        <style type='text/css'>{styles}</style>
      </head>
      <body>
        <div class='container'>
          <div class='logo' />
          <div class='title'>
            <h2>{title}</h2>
          </div>
          <div class='description'>
            <span>{description}</span>
          </div>

          <div class='button'>
            {btnPrimary}
            {btnSecondary}
          </div>
          <div class='caption'>
            <span>{caption}</span>
          </div>
          <div class='social-media'>
            <h4>Follow us in social media</h4>
            <a
              style='padding: 5px'
              href='https://github.com/netzoio'
              title='github'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='github' />
            </a>
            <a
              style='padding: 5px'
              href='https://discord.com/invite/6wQRmrcPXp'
              title='discord'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='discord' />
            </a>
            <a
              style='padding: 5px'
              href='https://www.facebook.com/netzoio'
              title='facebook'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='facebook' />
            </a>
            <a
              style='padding: 5px'
              href='https://www.instagram.com/netzoio/'
              title='instagram'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='instagram' />
            </a>
            <a
              style='padding: 5px'
              href='https://www.linkedin.com/company/73421774/admin/'
              title='linkedin'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='linkedin' />
            </a>
            <a
              style='padding: 5px'
              href='https://twitter.com/NetzoIO'
              title='twitter'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='twitter' />
            </a>
            <a
              style='padding: 5px'
              href='https://www.youtube.com/c/netzo'
              title='youtube'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='youtube' />
            </a>
          </div>
          <div class='contact-details'>
            <span>
              ROKAWARE SL | P. de la Castellana 89, Planta 8va | 28046 Madrid |
              Spain
            </span>
            <br />
            <span>
              Corte de Madrid | EUID: ES28065.082060194 | NIF: B09980772
            </span>
          </div>
          <div
            class='manage-preferences'
            style={!showPreferences
              ? 'visibility: hidden'
              : 'visibility:visible'}
          >
            <a href='https://netzo.io'>Manage your preferences</a>
          </div>
        </div>
      </body>
    </html>
  )
}
