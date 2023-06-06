/** @jsx h */
import { h } from "preact";
import { signal } from "@preact/signals";

// see https://creatomate.com/blog/the-best-video-generation-apis

export default () => {
  const isLoading = signal(false);
  return (
    <form method="POST" className="">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Pick a file</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <input
          type="file"
          name="files"
          multiple
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex justify-center">
        <button
          disabled
          type="submit"
          className={isLoading ? "btn btn-block" : "btn btn-block loading"}
        >
          Upload files
        </button>
      </div>
    </form>
  );
};
