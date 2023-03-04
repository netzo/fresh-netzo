/** @jsx h */
import { h } from 'https://deno.land/x/netzo@v0.1.44/mod.ts'
import { Header } from './header.tsx'
import { Footer } from './footer.tsx'

const title = 'File Upload Portal'
const description =
  'A file upload tool to ease data processing and syncing from files.'

function Portal() {
  return (
    <section>
      <form method='POST' enctype='multipart/form-data'>
        <input type='file' name='files' class='filepond' multiple />
        <div style='display: flex; justify-content: center;'>
          <button
            disabled
            type='submit'
            onclick="this.classList.toggle('button--loading')"
          >
            <span class='button__text'>Upload files</span>
          </button>
        </div>
      </form>
    </section>
  )
}

const [projectId, hash] = Deno.env.get('DENO_DEPLOYMENT_ID').replace('dev-', '')
  .split('-')

export const app = (
  <html>
    <head>
      <title>{`${title} | Netzo`}</title>
      <meta name='description' content={description} />
      <link
        href='https://unpkg.com/filepond/dist/filepond.min.css'
        rel='stylesheet'
      />
      <link
        href='https://unpkg.com/filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css'
        rel='stylesheet'
      />
      <link
        href={`https://api.netzo.io/projects/${projectId}/components/filepond/filepond.css?v=${Date.now()}`}
        rel='stylesheet'
      />
      <script src='https://unpkg.com/filepond/dist/filepond.js'></script>
      <script src='https://unpkg.com/filepond-plugin-file-encode/dist/filepond-plugin-file-encode.min.js'>
      </script>
      <script src='https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.min.js'>
      </script>
      <script src='https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.min.js'>
      </script>
      <script src='https://unpkg.com/filepond-plugin-file-poster/dist/filepond-plugin-file-poster.js'>
      </script>
      <script src='https://unpkg.com/filepond-plugin-get-file/dist/filepond-plugin-get-file.js'>
      </script>
      <script
        src={`https://api.netzo.io/projects/${projectId}/components/filepond/filepond.js?v=${Date.now()}`}
        type='module'
      >
      </script>
    </head>

    <body>
      <main style='display: grid; grid-template-rows: min-content auto min-content; height: 100%; padding: 0px 24px;'>
        <Header title={title} description={description} />
        <Portal />
        <Footer />
      </main>
    </body>
  </html>
)
