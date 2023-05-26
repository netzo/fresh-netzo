FilePond.registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFilePoster,
  FilePondPluginGetFile,
)

const form = document.querySelector('form')
const button = document.querySelector('button[type="submit"]')

const [filepond] = FilePond.parse(document.body)

filepond.on('updatefiles', (files) => {
  console.debug('Updated files', files)
  button.disabled = !files?.length
  if (!files?.length) button.innerText = 'Upload files'
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  button.classList.add('button--loading')
  try {
    const formData = new FormData(form)
    const url = 'https://postman-echo.com/post'
    // sets content-type header + boundary automatically, don't overwrite
    const response = await fetch(url, { method: 'POST', body: formData })
    const data = await response.json()
    const message = `Successfully posted data to ${url}:`
    console.debug(message, data)
    window.alert(`${message}:\n\n${JSON.stringify(data, null, 2)}`)
    button.innerText = 'Files uploaded successfully'
    button.disabled = true
  } catch (error) {
    console.error(`Error submitting files`, { cause: error })
    button.innerText = 'Retry'
  } finally {
    button.classList.remove('button--loading')
    // form.submit() // could continue default submisison
  }
})
