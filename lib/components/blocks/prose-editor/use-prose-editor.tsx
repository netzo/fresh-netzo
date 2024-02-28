// adapted from https://github.com/shadcn-ui/ui/issues/876#issuecomment-1627395691
import { type EditorOptions, useEditor } from "../../../deps/@tiptap/react.ts";
import {
  Highlight,
  Image,
  StarterKit,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  Youtube,
} from "../../../deps/@tiptap/starter-kit.ts";
import { cn } from "../../utils.ts";

export const useProseEditor = (options?: Partial<EditorOptions>) => {
  const editor = useEditor({
    content: "",
    editable: true,
    editorProps: {
      attributes: {
        class: cn(
          "prose", // IMPORTANT: prose is a tailwindcss class that properly styles markdown content
          "w-full h-full bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
        ),
      },
    },
    // extensions can be configured with Extension.configure({...}) method
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "w-full",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube,
    ],
    ...options,
  });

  return editor;
};
