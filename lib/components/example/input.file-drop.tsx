// adapted from https://gist.github.com/JaumeGelabert/2ea16a4649f4fdbe1a589cf5c23e0723
import type { JSX } from "../../deps/preact.ts";
import { effect, useSignal } from "../../deps/@preact/signals.ts";
import { Button } from "../ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.tsx";
import { cn } from "../utils.ts";

export interface InputFileProps extends JSX.HTMLAttributes<HTMLInputElement> {}

export function useDragDrop() {
  const dragOver = useSignal<boolean>(false);
  const fileDropError = useSignal<string>("");

  const onDragOver = (e: CustomEvent) => {
    e.preventDefault();
    dragOver.value = true;
  };

  const onDragLeave = () => dragOver.value = false;

  return {
    // Drag
    dragOver,
    onDragOver,
    onDragLeave,
    // Errors
    fileDropError,
  };
}

export default ({ className, type, ...props }: InputFileProps) => {
  const files = useSignal<File[]>([]);
  const loading = useSignal<{ [key: string]: boolean }>({});
  const previewImage = useSignal<any>(null);
  const imagePreviews = useSignal<{ [key: string]: string }>({});
  const acceptedTypes = useSignal<string>("images");
  const totalWeight = useSignal<number>(0);

  const { dragOver, onDragOver, onDragLeave, fileDropError } = useDragDrop();

  const onDrop = (e: JSX.DragEventHandler<HTMLLabelElement>) => {
    e.preventDefault();
    dragOver.value = false;

    const selectedFiles = Array.from(e.dataTransfer.files);

    // console.log(selectedfiles.value.map((file) => file.type.split("/")[0]));

    if (
      selectedFiles.some((file) => {
        const fileType = file.type.split("/")[0];
        return fileType !== "image";
      })
    ) {
      return fileDropError.value = "Invalid file type!";
    }

    files.value = [...files.value, ...selectedFiles];
    fileDropError.value = "";
  };

  const fileSelect = (e: JSX.GenericEventHandler<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList);

    if (
      selectedFiles.some((file) => {
        const fileType = file.type.split("/")[0];
        return fileType !== "image";
      })
    ) {
      return fileDropError.value = "Invalid file type!";
    }

    files.value = [...files.value, ...selectedFiles];
    fileDropError.value = "";
  };

  const simulateLoading = (file: File) => {
    // Calcula la duración del temporizador en milisegundos
    const duration = Math.max(1000, Math.min(file.size / 750, 4000));

    loading.value = { ...loading.value, [file.name]: true };

    setTimeout(() => {
      loading.value = { ...loading.value, [file.name]: false };
    }, duration);
  };

  const handleDelete = (fileName: string) => {
    files.value = files.value.filter((file) => file.name !== fileName);
  };

  const handlePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      imagePreviews.value = {
        ...imagePreviews.value,
        [file.name]: reader.result as string,
      };
    };
    reader.readAsDataURL(file);
  };

  effect(() => {
    files.value.forEach((file) => {
      if (loading.value[file.name] === undefined) {
        generatePreview(file);
        simulateLoading(file);
      }
    });
    totalWeight.value = files.value.reduce((acc, file) => acc + file.size, 0);
  });

  return (
    <>
      <div
        className={cn(
          "w-full max-w-lg border border-dashed rounded-xl m-2 p-3 !cursor-pointer",
          dragOver.value && "border-blue-600",
        )}
      >
        <form>
          <label
            htmlFor="file"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="flex flex-col items-center justify-start">
              <p className="font-semibold">
                Select or drag & drop files
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {files.value.length}{" "}
                {files.value.length === 1 ? "file" : "files"},{" "}
                {formatBytes(totalWeight.value)}
              </p>
            </div>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={fileSelect}
            multiple
          />
        </form>

        {files.value.length > 0 && (
          <div className="flex flex-col items-center justify-start w-full gap-2 mt-4 overflow-auto cursor-pointer max-h-52">
            {files.value.map((file, index) => {
              const isLoading = loading.value[file.name];
              const preview = imagePreviews.value[file.name];
              const isImage = (file: string) => file?.match(/image.*/);

              return (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between w-full px-2 py-1 border rounded-lg group"
                >
                  <div className="flex flex-row items-center justify-start gap-2">
                    <div>
                      {isLoading
                        ? (
                          <div className="flex flex-row items-center justify-center w-10 h-10 gap-2 border rounded-md">
                            <div className="w-4 h-4 animate-spin text-muted-foreground mdi-loading" />
                          </div>
                        )
                        : (
                          preview && (
                            <div className="relative w-10 h-10">
                              {isImage(preview) && (
                                <div className="relative w-10 h-10">
                                  <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full border rounded-md"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <div className="max-w-[300px] text-sm truncate">
                        {file.name}
                      </div>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(file.size)}
                        </p>
                        {!isLoading && (
                          <div className="flex flex-row justify-start items-center text-xs rounded-full px-2 py-[0.5px] gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <p className="text-muted-foreground">Uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hidden rounded-full group-hover:flex"
                          onClick={() => handlePreview(file)}
                        >
                          <div className="w-4 h-4 mdi-arrow-expand-all" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>{file.name}</DialogTitle>
                        <div className="rounded-xl relative w-full min-h-[300px] h-full flex flex-col justify-center items-center ">
                          {previewImage.value
                            ? (
                              isImage(previewImage.value)
                                ? (
                                  <img
                                    src={previewImage.value}
                                    alt="Image Preview"
                                    className="w-full h-full border rounded-md"
                                    style={{ objectFit: "cover" }}
                                  />
                                )
                                : null
                            )
                            : (
                              <div className="w-4 h-4 animate-spin text-muted-foreground mdi-loading" />
                            )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden rounded-full group-hover:flex"
                      onClick={() => handleDelete(file.name)}
                    >
                      <div className="w-4 h-4 mdi-delete" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {fileDropError.value && (
          <div className="flex flex-row items-center justify-center gap-2 py-1 mx-2 my-2 text-center border border-orange-200 rounded-lg">
            <div className="w-4 h-4 text-orange-400 mdi-file" />
            <p className="text-sm font-medium text-orange-400">
              {fileDropError.value}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
