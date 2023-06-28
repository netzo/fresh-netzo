import { signal } from '@preact/signals'

// see https://creatomate.com/blog/the-best-video-generation-apis

export default () => {
  const isLoading = signal(false)
  return (
    <form method='POST' class=''>
      <div class='form-control w-full max-w-xs'>
        <label class='label'>
          <span class='label-text'>Pick a file</span>
          <span class='label-text-alt'>Alt label</span>
        </label>
        <input
          type='file'
          name='files'
          multiple
          class='file-input file-input-bordered w-full max-w-xs'
        />
      </div>
      <div class='flex justify-center'>
        <button
          disabled
          type='submit'
          class={isLoading ? 'btn btn-block' : 'btn btn-block loading'}
        >
          Upload files
        </button>
      </div>
    </form>
  )
}
